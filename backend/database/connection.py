from fastapi import Depends
from typing import Annotated
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

URL_DATABASE = 'postgresql://postgres:postgres@localhost:5433/TransactionsDB'

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

Base.metadata.create_all(bind=engine)

db_depedency = Annotated[Session, Depends(get_db)]