from django.urls import path
from .views import SingleSong, ManySongs, SingleCategory, ManyCategories

urlpatterns = [
  path('', ManySongs.as_view()),
  path('<int:pk>/', SingleSong.as_view()),
  path('categories/', ManyCategories.as_view()),
  path('categories/<int:pk>/', SingleCategory.as_view())
]