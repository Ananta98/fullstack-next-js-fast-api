def decode_customer(doc) -> dict:
    return {
        'id': doc.id,
        'name': doc.name,
        'phone_number': doc.phone_number,
        'email': doc.email,
        'address': doc.address
    }

def decode_customers(docs) -> list:
    return [
        decode_customer(doc) for doc in docs
    ]