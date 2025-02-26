from database.connection import Base
from sqlalchemy import Column, Integer, String, DECIMAL, Boolean

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True)
    price = Column(DECIMAL(10, 2))
    is_active = Column(Boolean, default=True)