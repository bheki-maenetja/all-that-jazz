#pylint: disable = no-member, arguments-differ
from django.db import models

class Artist(models.Model):
  name = models.CharField(max_length=100)
  nickname = models.CharField(max_length=100)
  description = models.CharField(max_length=10000)
  image_url = models.CharField(max_length=1000)

  def __str__(self):
    return f'{self.name} - {self.nickname} (Id: {self.id})'