from starlette import status
from fastapi import HTTPException
from models.sql.product import Product
from models.sql.customer import Customer
from models.sql.transaction import Transaction, TransactionList
from database.connection import db_depedency
from models.pydantic.transaction import TransactionRequest
from decoder.transaction import decode_transaction_details, decode_transactions, decode_transaction

def get_all_transactions(db: db_depedency, user_id: int):
    try:
        res = db.query(Transaction, Customer).filter_by(is_active=True, user_id=user_id).join(Customer).all()
        return {
            'status': 'success',
            'data' : decode_transactions(res)
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f'Error get all transactions: {e}')
    
def get_detail_transaction(db: db_depedency, transaction_id: int):
    try:
        transaction, customer = db.query(Transaction, Customer).filter_by(is_active=True, id=transaction_id).join(Customer).one_or_none()
        if transaction is None or customer is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'transaction with id {transaction_id} not found')
        else:
            decoded = decode_transaction(transaction, customer)
            transaction_list = db.query(TransactionList, Product).filter_by(is_active=True, transaction_id=int(decoded['id'])).join(Product).all()
            decoded['transaction_list'] = decode_transaction_details(transaction_list)
            return {
                'status': 'success',
                'data' : decoded
            }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f'Error get transaction detail: {e}')

    
def delete_transaction(db: db_depedency, transaction_id: int):
    try:
        res = db.query(Transaction).filter_by(is_active=True, id=transaction_id).one_or_none()
        if res is None:
            return {
                'status': 'error',
                'message' : f'transaction with id {transaction_id} not found'
            }
        else:
            res.is_active = False
            db.commit()
            return {
                'status': 'success',
                'data' : f'transaction with id {transaction_id} has been deleted'
            }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f'Error delete transaction: {e}')

def add_new_transaction(db: db_depedency, user_id: int, new_transaction: TransactionRequest):
    try:
        db_transaction = Transaction(user_id=user_id, customer_id=new_transaction.customer_id, total=new_transaction.total)
        db.add(db_transaction)
        db.commit()
        db.refresh(db_transaction)
        for transaction in new_transaction.transaction_details:
            item = TransactionList(transaction_id=db_transaction.id, product_id=transaction.product_id, count=transaction.count, sub_total=transaction.sub_total)
            db.add(item)
        db.commit()
        return {
            'status' : 'success',
            'message': 'new transaction added'
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f'Error add new transaction: {e}')
