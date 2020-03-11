from django.contrib import admin
from .models import Song, SongCategory

admin.site.register(Song)
admin.site.register(SongCategory)