# pylint: disable=no-member
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_406_NOT_ACCEPTABLE, HTTP_422_UNPROCESSABLE_ENTITY
from .serializers import PlayListSerializer, PopulatedPlaylistSerializer

from .models import Playlist

User = get_user_model()

class SinglePlaylist(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, _request, pk):
    try:
      playlist = Playlist.objects.get(pk=pk)
      serial_playlist = PopulatedPlaylistSerializer(playlist)
      return Response(serial_playlist.data, status=HTTP_200_OK)
    except:
      return Response({'message': 'Playlist not found'}, status=HTTP_404_NOT_FOUND)

class ManyPlaylists(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, _request):
    playlists = Playlist.objects.all()
    serial_playlists = PopulatedPlaylistSerializer(playlists, many=True)
    return Response(serial_playlists.data, status=HTTP_200_OK)

  def post(self, request):
    request.data['owner'] = request.user.id
    new_playlist = PlayListSerializer(data=request.data)

    if new_playlist.is_valid():
      new_playlist.save()
      return Response(new_playlist.data, status=HTTP_201_CREATED)
    return Response(new_playlist.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)