from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import PostgresDsn

SQLALCHEMY_DATABASE_URI = PostgresDsn.build(
    scheme="postgresql",
    user="postgres",
    password="postgres",
    host="localhost:5432",
    path=f"/{'quizz' or ''}",
)

engine = create_engine(
    SQLALCHEMY_DATABASE_URI,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()