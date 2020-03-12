#pylint: disable = no-member, arguments-differ
from django.db import models
from artists.models import Artist

class SongCategory(models.Model):
  name = models.CharField(max_length=50)
  description = models.CharField(max_length=300)

  def __str__(self):
    return f'{self.name} (Id: {self.id})'

class Song(models.Model):
  name = models.CharField(max_length=200)
  lyrics = models.CharField(max_length=10000)
  audio_url = models.CharField(max_length=1000)
  audio_preview_url = models.CharField(max_length=1000)
  release_year = models.IntegerField(default=0)
  artist = models.ForeignKey(Artist, related_name='songs', null=False, on_delete=models.CASCADE)
  categories = models.ManyToManyField(SongCategory, related_name='songs', blank=True)

  def __str__(self):
    return f'{self.name} by {self.artist.name} - {self.release_year} (Id: {self.id})'
