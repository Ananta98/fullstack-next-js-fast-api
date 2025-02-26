from fastapi import APIRouter
from operations import product
from operations.auth import user_depedency
from database.connection import db_depedency
from models.pydantic.product import ProductRequest

router = APIRouter(
    prefix='/products',
    tags=['products']
)

@router.get("/")
async def all_products(user: user_depedency, db: db_depedency):
    return product.get_all_products(db)

@router.get("/{product_id}")
async def get_product_details(user: user_depedency, db: db_depedency, product_id: int):
    return product.get_detail_product(db, product_id)

@router.post("/")
async def add_product(user: user_depedency, db: db_depedency, request: ProductRequest):
    return product.add_new_product(db, request)

@router.patch("/{product_id}")
async def update_product(user: user_depedency, db: db_depedency, product_id: int, request: ProductRequest):
    return product.update_product(db, product_id, request)

@router.delete("/{product_id}")
async def delete_product(user: user_depedency, db: db_depedency, product_id: int):
    return product.delete_product(db, product_id)