from django.contrib import admin

from .models import (
    Category,
    Task,
    Tag,
    TaskTag,
    StickyNote
)

admin.site.register(Category)
admin.site.register(Task)
admin.site.register(Tag)
admin.site.register(TaskTag)
admin.site.register(StickyNote)
