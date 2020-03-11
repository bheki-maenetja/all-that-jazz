from django.urls import path
from .views import SingleArtist, ManyArtists

urlpatterns = [
  path('', ManyArtists.as_view()),
  path('<int:pk>/', SingleArtist.as_view())
]