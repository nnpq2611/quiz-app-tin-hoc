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


@app.get("/collections/")
def get_collections(db: Session = Depends(get_db)):
    collections = Crud.get_collections(db=db)
    return collections


@app.get("/questions/")
def get_questions(collections_id: int, db: Session = Depends(get_db)):
    questions = Crud.get_questions(db=db, collections_id=collections_id)
    return questions


@app.post("/questions/")
async def create_file(file: UploadFile = File(...),  db: Session = Depends(get_db)):
    return Crud.create_question(db=db, file=file)

# post test example:

@app.get("/test")
def check_answer(test: Schemas.Test, db: Session = Depends(get_db)):
    return Crud.check_answer(db=db, test=test)
