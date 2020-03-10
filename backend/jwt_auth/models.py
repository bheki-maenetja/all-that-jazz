from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  email = models.CharField(max_length=40, unique=True)
  first_name = models.CharField(max_length=20)
  last_name = models.CharField(max_length=20)
  alias = models.CharField(max_length=20, default='')
  profile_image = models.CharField(max_length=500)

