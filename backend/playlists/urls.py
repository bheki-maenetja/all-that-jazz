from django.urls import path
from .views import SinglePlaylist, ManyPlaylists, AddSongToPlaylist, RemoveSongFromPlaylist

urlpatterns = [
  path('', ManyPlaylists.as_view()),
  path('<int:pk>/', SinglePlaylist.as_view()),
  path('<int:pk>/add-song/', AddSongToPlaylist.as_view()),
  path('<int:pk>/remove-song/', RemoveSongFromPlaylist.as_view())
]