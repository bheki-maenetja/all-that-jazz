#pylint: disable = no-member, arguments-differ
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Playlist(models.Model):
  name = models.CharField(max_length=50)
  description = models.CharField(max_length=300)
  owner = models.ForeignKey(User, related_name='playlists', null=False, on_delete=models.CASCADE)
  songs = models.ManyToManyField('songs.Song', related_name='playlists', blank=True)

  def __str__(self):
    return f'{self.name} (Id: {self.id})'
