from starlette import status
from fastapi import HTTPException
from models.sql.customer import Customer
from database.connection import db_depedency
from models.pydantic.customer import CustomerRequest
from decoder.customer import decode_customer, decode_customers

def get_all_customers(db: db_depedency):
    try:
        res = db.query(Customer).filter_by(is_active=True).all()
        return {
            'status': 'success',
            'data' : decode_customers(res)
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error get all customers: {e}")

def get_customer_details(db: db_depedency, customer_id: int):
    try:
        res = db.query(Customer).filter_by(is_active=True, id=customer_id).one_or_none()
        if res is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'customer with id {customer_id} not found')
        else:
            return {
                'status': 'success',
                'data' : decode_customer(res)
            }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error: {e}")


def add_new_customer(db: db_depedency, new_customer: CustomerRequest):
    try:
        req = Customer(name=new_customer.name, 
                       phone_number=new_customer.phone_number, 
                       email=new_customer.email, 
                       address=new_customer.address)
        db.add(req)
        db.commit()
        return {
            'status' : 'success',
            'message': 'new customer added'
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error add new customer: {e}")

def delete_customer(db: db_depedency, customer_id: int):
    try:
        res = db.query(Customer).filter_by(id=customer_id, is_active=True).one_or_none()
        if res is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'customer with id {customer_id} not found')
        else:
            res.is_active = False
            db.commit()
            return {
                'status' : 'success',
                'message': f'Customer {customer_id} deleted'
            }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error delete customer: {e}")

def update_customer(db: db_depedency, customer_id: int, customer: CustomerRequest):
    try:
        res = db.query(Customer).filter_by(id=customer_id, is_active=True).one_or_none()
        if res is not None:
            res.name = customer.name
            res.email = customer.email
            res.address = customer.address
            res.phone_number = customer.phone_number
            db.commit()
            return {
                'status' : 'success',
                'message': f'product {customer_id} deleted'
            }
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'customer with id {customer_id} not found')
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error update customer: {e}")