from rest_framework import serializers
from .models import Artist
from songs.models import Song, SongCategory

# Native Serializers
class ArtistSerializer(serializers.ModelSerializer):

  class Meta:
    model = Artist
    fields = '__all__'

# Foreign Serializer
class SongCategorySerializer(serializers.ModelSerializer):

  class Meta:
    model = SongCategory
    fields = '__all__'

class SongSerializer(serializers.ModelSerializer):
  categories = SongCategorySerializer(many=True)
  class Meta:
    model = Song
    exclude = ('artist', 'lyrics')

# Populated Native Serializers
class PopulatedArtistSerializer(ArtistSerializer):
  songs = SongSerializer(many=True)