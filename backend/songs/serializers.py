from rest_framework import serializers
from .models import Song, SongCategory

from artists.models import Artist

# Native Serializers
class SongSerializer(serializers.ModelSerializer):

  class Meta:
    model = Song
    fields = '__all__'

class SongCategorySerializer(serializers.ModelSerializer):

  class Meta:
    model = SongCategory
    fields = '__all__'

# Foreign Serializers
class ArtistSerializer(serializers.ModelSerializer):

  class Meta:
    model = Artist
    exclude = ('description', )

# Populated Native Serializers
class PopulatedSongSerializer(SongSerializer):
  artist = ArtistSerializer()
  categories = SongCategorySerializer(many=True)

class PopulatedCategorySerializer(SongCategorySerializer):

  class CustomSongSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer()
    class Meta:
      model = Song
      exclude = ('categories', 'lyrics')
  
  songs = CustomSongSerializer(many=True)