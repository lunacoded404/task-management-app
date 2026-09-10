from django.urls import path

from .views import SyncFirebaseUserView


urlpatterns = [
    path(
        "auth/sync/",
        SyncFirebaseUserView.as_view(),
        name="firebase-user-sync"
    ),
]