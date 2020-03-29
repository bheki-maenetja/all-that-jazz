from django.urls import path
from .views import RegisterView, LoginView, ProfileView, LikeSong, UnlikeSong, LikeArtist, UnlikeArtist

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  path('my-profile/', ProfileView.as_view()),
  path('like-song/', LikeSong.as_view()),
  path('unlike-song/', UnlikeSong.as_view()),
  path('like-artist/', LikeArtist.as_view()),
  path('unlike-artist/', UnlikeArtist.as_view())
]