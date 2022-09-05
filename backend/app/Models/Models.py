from multiprocessing.connection import answer_challenge
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, func, TIMESTAMP
from sqlalchemy.orm import relationship

from ..database.Database import Base


class Collections(Base):
    __tablename__ = "collections"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    create_at = Column(TIMESTAMP, nullable=False, server_default=func.now())


class Questions(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    answer1 = Column(String, nullable=False)
    answer2 = Column(String, nullable=False)
    answer3 = Column(String, nullable=False)
    answer4 = Column(String, nullable=False)
    correct_answer = Column(String, nullable=False)
    collections_id = Column(Integer, ForeignKey("collections.id"), nullable=False)
    create_at = Column(TIMESTAMP, nullable=False, server_default=func.now())


