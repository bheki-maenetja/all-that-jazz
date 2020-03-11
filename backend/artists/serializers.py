from rest_framework import serializers
from .models import Artist

# Native Serializers
class ArtistSerializer(serializers.ModelSerializer):

  class Meta:
    model = Artist
    fields = '__all__'