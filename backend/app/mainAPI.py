from .Models import Models
from .database import Schemas
from fastapi import Depends, FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session


from .Models import Crud
from .database.Database import SessionLocal, engine

Models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:3030",
    "localhost:3030"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

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
async def create_questions(file: UploadFile = File(...),  db: Session = Depends(get_db)):
    return Crud.create_questions(db=db, file=file)

# post test example:

@app.post("/results/")
def results(test: Schemas.Test, db: Session = Depends(get_db)):
    return Crud.results(db=db, test=test)

@app.delete("/collections/{collections_id}")
def delete_collection(collections_id: int, db: Session = Depends(get_db)):
    return Crud.delete_collection(db=db, collections_id=collections_id)

