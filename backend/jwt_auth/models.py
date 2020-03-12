#pylint: disable = no-member, arguments-differ
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  email = models.CharField(max_length=40, unique=True)
  first_name = models.CharField(max_length=20)
  last_name = models.CharField(max_length=20)
  alias = models.CharField(max_length=20, default='')
  profile_image = models.CharField(max_length=500)
  favourite_songs = models.ManyToManyField('songs.Song', related_name='user_likes', blank=True)
  favourite_artists = models.ManyToManyField('artists.Artist', related_name='followers', blank=True)

  def __str__(self):
    return f'{self.username} (Id: {self.id})'

