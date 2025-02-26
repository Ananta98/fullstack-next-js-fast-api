from fastapi import APIRouter
from operations import customer
from operations.auth import user_depedency
from database.connection import db_depedency
from models.pydantic.customer import CustomerRequest

router = APIRouter(
    prefix='/customers',
    tags=['customers']
)

@router.get("/")
async def all_customers(user: user_depedency, db: db_depedency):
    return customer.get_all_customers(db)

@router.post("/")
async def add_customer(user: user_depedency, db: db_depedency, request: CustomerRequest):
    return customer.add_new_customer(db, request)

@router.get("/{customer_id}")
async def get_customer_detail(user: user_depedency, db: db_depedency, customer_id: int):
    return customer.get_customer_details(db, customer_id)

@router.patch("/{customer_id}")
async def update_customer(user: user_depedency, db: db_depedency, customer_id: int, request: CustomerRequest):
    return customer.update_customer(db, customer_id, request)

@router.delete("/{customer_id}")
async def delete_customer(user: user_depedency, db: db_depedency, customer_id: int):
    return customer.delete_customer(db, customer_id)