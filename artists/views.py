# pylint: disable=no-member
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_202_ACCEPTED, HTTP_404_NOT_FOUND
from .serializers import ArtistSerializer, PopulatedArtistSerializer

from .models import Artist

class SingleArtist(APIView):

  def get(self, _request, pk):
    try:
      artist = Artist.objects.get(pk=pk)
      serial_artist = PopulatedArtistSerializer(artist)
      return Response(serial_artist.data, HTTP_200_OK)
    except Artist.DoesNotExist:
      return Response({'message': 'Artist not found'}, status=HTTP_404_NOT_FOUND)

class ManyArtists(APIView):

  def get(self, _request):
    artists = Artist.objects.all()
    serial_artists = PopulatedArtistSerializer(artists, many=True)
    return Response(serial_artists.data, status=HTTP_200_OK)