# pylint: disable=no-member
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_202_ACCEPTED, HTTP_404_NOT_FOUND
from .serializers import SongSerializer, SongCategorySerializer, PopulatedSongSerializer, PopulatedCategorySerializer

from .models import Song, SongCategory

# Song Views
class SingleSong(APIView):

  def get(self, _request, pk):
    try:
      song = Song.objects.get(pk=pk)
      serial_song = PopulatedSongSerializer(song)
      return Response(serial_song.data, HTTP_200_OK)
    except Song.DoesNotExist:
      return Response({'message': 'Song not found'}, status=HTTP_404_NOT_FOUND)

class ManySongs(APIView):

  def get(self, _request):
    songs = Song.objects.all()
    serial_songs = PopulatedSongSerializer(songs, many=True)
    return Response(serial_songs.data, status=HTTP_200_OK)

# Song Category Views
class SingleCategory(APIView):

  def get(self, _request, pk):
    try:
      category = SongCategory.objects.get(pk=pk)
      serial_category = PopulatedCategorySerializer(category)
      return Response(serial_category.data, HTTP_200_OK)
    except Song.DoesNotExist:
      return Response({'message': 'Category not found'}, status=HTTP_404_NOT_FOUND)

class ManyCategories(APIView):

  def get(self, _request):
    categories = SongCategory.objects.all()
    serial_categories = PopulatedCategorySerializer(categories, many=True)
    return Response(serial_categories.data, HTTP_200_OK)