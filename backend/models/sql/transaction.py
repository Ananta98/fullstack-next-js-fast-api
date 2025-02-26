from datetime import datetime
from database.connection import Base
from sqlalchemy import Column, Integer, DateTime, DECIMAL, ForeignKey, Boolean

class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    customer_id = Column(Integer, ForeignKey("customers.id"))
    transaction_date = Column(DateTime, default=datetime.now())
    total = Column(DECIMAL(10, 2), default=0)
    is_active = Column(Boolean, default=True)

class TransactionList(Base):
    __tablename__ = 'transaction_details'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    transaction_id = Column(Integer, ForeignKey("transactions.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    count = Column(Integer, default=1)
    sub_total = Column(DECIMAL(10, 2), default=0)
    is_active = Column(Boolean, default=True)