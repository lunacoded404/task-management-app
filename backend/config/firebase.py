# import os

# import firebase_admin
# from firebase_admin import credentials


# BASE_DIR = os.path.dirname(
#     os.path.dirname(
#         os.path.abspath(__file__)
#     )
# )

# firebase_service_account = os.path.join(
#     BASE_DIR,
#     "firebase-service-account.json"
# )

# cred = credentials.Certificate(
#     firebase_service_account
# )

# firebase_admin.initialize_app(cred)


import os

import firebase_admin
from firebase_admin import credentials


if not firebase_admin._apps:
    if os.environ.get("RENDER"):
        firebase_service_account = (
            "/etc/secrets/firebase-service-account.json"
        )
    else:
        BASE_DIR = os.path.dirname(
            os.path.dirname(
                os.path.abspath(__file__)
            )
        )

        ROOT_DIR = os.path.dirname(BASE_DIR)

        firebase_service_account = os.path.join(
            BASE_DIR,
            "firebase-service-account.json"
        )

    cred = credentials.Certificate(
        firebase_service_account
    )

    firebase_admin.initialize_app(cred)