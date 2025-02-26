def decode_product(doc) -> dict:
    return {
        'id': doc.id,
        'name': doc.name,
        'price': doc.price,
    }

def decode_products(docs) -> list:
    return [
        decode_product(doc) for doc in docs
    ]