from rest_framework.routers import DefaultRouter

from .views import (
    CalendarViewSet,
    TaskViewSet, 
    CategoryViewSet,
    TagViewSet,
    StickyNoteViewSet, 
    SubTaskViewSet,
    ViewSettingViewSet
)


router = DefaultRouter()

router.register(
    r"categories",
    CategoryViewSet,
    basename="category",
)

router.register(
    r"tasks",
    TaskViewSet,
    basename="task",
)

router.register(
    "subtasks",
    SubTaskViewSet,
    basename="subtask",
)

router.register(
    r"tags",
    TagViewSet,
    basename="tag",
)

router.register(
    r"sticky-notes",
    StickyNoteViewSet,
    basename="sticky-note",
)

router.register(
    "calendar",
    CalendarViewSet,
    basename="calendar",
)

router.register(
    r"view-settings", 
    ViewSettingViewSet, 
    basename="view-setting")

urlpatterns = router.urls