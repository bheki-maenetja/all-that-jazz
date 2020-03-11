from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Playlist

User = get_user_model()

# Native Serializers
class PlayListSerializer(serializers.ModelSerializer):

  class Meta:
    model = Playlist
    fields = '__all__'

# Foreign Serializers
class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile_image')

# Populated Native Serializers
class PopulatedPlaylistSerializer(PlayListSerializer):
  owner = UserSerializer()