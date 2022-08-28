from gc import collect
from sqlalchemy.orm import Session

from ..database import Schemas

from fastapi import File, UploadFile

import shutil
import docx

from . import Models


# def get_user(db: Session, user_id: int):
#     return db.query(Models.User).filter(Models.User.id == user_id).first()


# def get_user_by_email(db: Session, email: str):
#     return db.query(Models.User).filter(Models.User.email == email).first()


def get_collections(db: Session):
    data = db.query(Models.Collections).all()    
    for i in data:
        print('id: ', i.id,'title: ', i.title)
    return data


def get_questions(db: Session):
    return db.query(Models.Questions).all()

def create_collection(db: Session, collection: Schemas.Collections):
    db_collection = Models.Collections(
        title=collection.title
    )
    db.add(db_collection)
    db.commit()
    db.refresh(db_collection)
    print('id: ', db_collection.id, 'title: ', db_collection.title)
    return db_collection


def create_question(db: Session, file: UploadFile = File(...)):
    dir = f'./app/data/{file.filename}'
    with open(dir, 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    doc = docx.Document(dir)

    data = {'title': doc.paragraphs[0].text,'questions': []}

    for i in range (0, doc.paragraphs.__len__()):
        dic = {}
        if doc.paragraphs[i].text.startswith('Câu'):
            dic["question"] = doc.paragraphs[i].text
            dic["answer"] = [doc.paragraphs[i+1].text, doc.paragraphs[i+2].text, doc.paragraphs[i+3].text, doc.paragraphs[i+4].text]
            data['questions'].append(dic)

    db_collection = Models.Collections(
        title = data['title']
    )
    db.add(db_collection)
    db.commit()
    db.refresh(db_collection)
    
    for i in range (0, data['questions'].__len__()):
        db_question = Models.Questions(
            title = data['questions'][i]['question'],
            answer1 = data['questions'][i]['answer'][0],
            answer2 = data['questions'][i]['answer'][1],
            answer3 = data['questions'][i]['answer'][2],
            answer4 = data['questions'][i]['answer'][3],
            correct_answer = data['questions'][i]['answer'][0],
            collections_id = db_collection.id
        )
        db.add(db_question)
        db.commit()
        db.refresh(db_question)
    return {"data": data}
