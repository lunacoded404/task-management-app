from firebase_admin import auth
from rest_framework import authentication
from rest_framework import exceptions
from django.contrib.auth import get_user_model

User = get_user_model()


class FirebaseAuthentication(
    authentication.BaseAuthentication
):
    def authenticate(self, request):

        auth_header = request.headers.get(
            "Authorization"
        )

        if not auth_header:
            return None

        try:
            scheme, token = auth_header.split(
                " ",
                1
            )

        except ValueError:
            raise exceptions.AuthenticationFailed(
                "Invalid Authorization header."
            )

        if scheme.lower() != "bearer":
            raise exceptions.AuthenticationFailed(
                "Bearer token required."
            )

        # Verify Firebase ID Token
        try:
            decoded_token = auth.verify_id_token(
                token
            )

        except Exception as e:
            print(
                "=== LỖI XÁC THỰC FIREBASE ===",
                str(e)
            )

            raise exceptions.AuthenticationFailed(
                f"Invalid Firebase ID token: {str(e)}"
            )

        firebase_uid = decoded_token["uid"]
        email = decoded_token.get("email", "")
        user, created = User.objects.get_or_create(
            firebase_uid=firebase_uid,
            defaults={
                "username": firebase_uid,
                "email": email,
            }
        )

        if created:
            print(
                "=== DJANGO USER CREATED ==="
            )
            print(
                "Firebase UID:",
                firebase_uid
            )
            print(
                "Email:",
                email
            )

        else:
            print(
                "=== DJANGO USER FOUND ==="
            )
            print(
                "Firebase UID:",
                firebase_uid
            )

        return user, None