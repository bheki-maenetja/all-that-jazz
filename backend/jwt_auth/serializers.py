#pylint: disable = no-member, arguments-differ
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
# import django.contrib.auth.password_validation as validations
# from django.core.exceptions import ValidationError
User = get_user_model()

from playlists.models import Playlist
from songs.models import Song
from artists.models import Artist

# Native Serializers
class UserSerializer(serializers.ModelSerializer):

  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)

  def validate(self, data):
    password = data.pop('password')
    password_confirmation = data.pop('password_confirmation')

    if password != password_confirmation:
      raise serializers.ValidationError({'password_confirmation': 'Does Not Match'})

    # try:
    #   validations.validate_password(password=password)
    # except ValidationError as err:
    #   raise serializers.ValidationError({'password_confirmation': err.messages})

    data['password'] = make_password(password)
    return data
  
  class Meta:
    model = User
    fields = '__all__'

# Foreign Serializers
class ArtistSerializer(serializers.ModelSerializer):

  class Meta:
    model = Artist
    exclude = ('description', )

class SongSerializer(serializers.ModelSerializer):

  artist = ArtistSerializer()
  class Meta:
    model = Song
    exclude = ('lyrics', 'audio_preview_url', 'categories')

class PlaylistSerializer(serializers.ModelSerializer):

  class Meta:
    model = Playlist
    exclude = ('owner', )

# Native Populated Serializers
class PopulatedPlaylistSerializer(PlaylistSerializer):
  songs = SongSerializer(many=True)

class PopulatedUserSerializer(UserSerializer):
  playlists = PopulatedPlaylistSerializer(many=True)
  favourite_songs = SongSerializer(many=True)
  favourite_artists = ArtistSerializer(many=True)