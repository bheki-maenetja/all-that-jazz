from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Playlist

from songs.models import Song
from songs.models import Artist

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

class ArtistSerializer(serializers.ModelSerializer):

  class Meta:
    model = Artist
    exclude = ('description', )

class SongSerializer(serializers.ModelSerializer):

  artist = ArtistSerializer()
  class Meta:
    model = Song
    exclude = ('categories', 'audio_preview_url')

# Populated Native Serializers
class PopulatedPlaylistSerializer(PlayListSerializer):
  owner = UserSerializer()
  songs = SongSerializer(many=True)