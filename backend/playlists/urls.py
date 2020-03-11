from django.urls import path
from .views import SinglePlaylist, ManyPlaylists

urlpatterns = [
  path('', ManyPlaylists.as_view()),
  path('<int:pk>/', SinglePlaylist.as_view())
]