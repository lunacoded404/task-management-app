import os

import firebase_admin
from firebase_admin import credentials


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

firebase_service_account = os.path.join(
    BASE_DIR,
    "firebase-service-account.json"
)

cred = credentials.Certificate(
    firebase_service_account
)

firebase_admin.initialize_app(cred)