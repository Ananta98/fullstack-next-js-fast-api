from database.connection import Base
from sqlalchemy import Column, Integer, String

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True)
    password = Column(String)