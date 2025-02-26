from database.connection import Base
from sqlalchemy import Column, Integer, String, Boolean

class Customer(Base):
    __tablename__ = 'customers'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    phone_number = Column(String)
    email = Column(String)
    address = Column(String)
    is_active = Column(Boolean, default=True)