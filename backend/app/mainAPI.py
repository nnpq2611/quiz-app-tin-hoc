from turtle import title
from .Models import Models
from .database import Schemas
from fastapi import Depends, FastAPI, HTTPException, File, UploadFile
from sqlalchemy.orm import Session


from .Models import Crud
from .database.Database import SessionLocal, engine

Models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get('/')
async def get():
    return "Welcome to Quiz App"

# @app.post("/users/", response_model=Schemas.User)
# def create_user(user: Schemas.UserCreate, db: Session = Depends(get_db)):
#     db_user = Crud.get_user_by_email(db, email=user.email)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
#     return Crud.create_user(db=db, user=user)


@app.get("/collections/")
def get_collections(db: Session = Depends(get_db)):
    collections = Crud.get_collections(db=db)
    return collections

@app.get("/questions/")
def get_questions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    questions = Crud.get_questions(db, skip=skip, limit=limit)
    return questions

@app.post("/collections/")
def create_collection(collection: Schemas.Collections, db: Session = Depends(get_db)):
    return Crud.create_collection(db=db, collection=collection)


@app.post("/files/")
async def create_file(file: UploadFile = File(...),  db: Session = Depends(get_db)):
    return Crud.create_question(db=db, file=file)


