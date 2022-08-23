from .Models import Models
from .database import Schemas
from fastapi import Depends, FastAPI, HTTPException
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


@app.post("/users/", response_model=Schemas.User)
def create_user(user: Schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = Crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return Crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[Schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = Crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=Schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = Crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/users/{user_id}/items/", response_model=Schemas.Item)
def create_item_for_user(
    user_id: int, item: Schemas.ItemCreate, db: Session = Depends(get_db)
):
    return Crud.create_user_item(db=db, item=item, user_id=user_id)


@app.get("/items/", response_model=list[Schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = Crud.get_items(db, skip=skip, limit=limit)
    return items
