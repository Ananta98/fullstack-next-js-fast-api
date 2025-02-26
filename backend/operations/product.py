from starlette import status
from fastapi import HTTPException
from models.sql.product import Product
from database.connection import db_depedency
from models.pydantic.product import ProductRequest
from decoder.product import decode_product, decode_products

def get_all_products(db: db_depedency):
    try:
        res = db.query(Product).filter_by(is_active=True).all()
        return {
            'status': 'success',
            'data' : decode_products(res)
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error: {e}")

    
def get_detail_product(db: db_depedency, product_id: int):
    try:
        res = db.query(Product).filter_by(is_active=True, id=product_id).one_or_none()
        if res is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'product with id {product_id} not found')
        else:
            return {
                'status': 'success',
                'data' : decode_product(res)
            }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error: {e}")

def add_new_product(db: db_depedency, new_product: ProductRequest):
    try:
        req = Product(name=new_product.name, price=new_product.price)
        db.add(req)
        db.commit()
        return {
            'status' : 'success',
            'message': 'new product added'
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error: {e}")

def delete_product(db: db_depedency, product_id: int):
    try:
        res = db.query(Product).filter_by(id=product_id, is_active=True).one_or_none()
        if res is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'product with id {product_id} not found')
        else:
            res.is_active = False
            db.commit()
            return {
                'status' : 'success',
                'message': f'product {product_id} deleted'
            }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error: {e}")


def update_product(db: db_depedency, product_id: int, product: ProductRequest):
    try:
        res = db.query(Product).filter_by(id=product_id, is_active=True).one_or_none()
        if res is not None:
            res.name = product.name
            res.price = product.price
            db.commit()
            return {
                'status' : 'success',
                'message': f'product {product_id} deleted'
            }
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'product with id {product_id} not found')
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error: {e}")
