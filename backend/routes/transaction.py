from fastapi import APIRouter
from operations import transaction
from operations.auth import user_depedency
from database.connection import db_depedency
from models.pydantic.transaction import TransactionRequest

router = APIRouter(
    prefix='/transactions',
    tags=['transactions']
)

@router.get("/")
async def all_transactions(user: user_depedency, db: db_depedency):
    return transaction.get_all_transactions(db, int(user['id']))

@router.get("/{transaction_id}")
async def get_transaction_details(user: user_depedency, db: db_depedency, transaction_id: int):
    return transaction.get_detail_transaction(db, transaction_id)

@router.post("/")
async def add_product(user: user_depedency, db: db_depedency, request: TransactionRequest):
    return transaction.add_new_transaction(db, int(user['id']), request)

@router.delete("/{transaction_id}")
async def delete_transaction(user: user_depedency, db: db_depedency, transaction_id: int):
    return transaction.delete_transaction(db, transaction_id)