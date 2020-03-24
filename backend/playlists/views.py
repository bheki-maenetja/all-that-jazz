# pylint: disable=no-member
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_406_NOT_ACCEPTABLE, HTTP_422_UNPROCESSABLE_ENTITY
from .serializers import PlayListSerializer, PopulatedPlaylistSerializer

from .models import Playlist
from songs.models import Song

User = get_user_model()

# Playlist views
class SinglePlaylist(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, _request, pk):
    try:
      playlist = Playlist.objects.get(pk=pk)
      serial_playlist = PopulatedPlaylistSerializer(playlist)
      return Response(serial_playlist.data, status=HTTP_200_OK)
    except Playlist.DoesNotExist:
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

# Handling songs in playlist
class AddSongToPlaylist(APIView):

  permission_classes = (IsAuthenticated, )

  def post(self, request, pk):
    try:
      playlist = Playlist.objects.get(pk=pk)
      if request.user.id != playlist.owner.id:
        return Response({'message': 'UNAUTHORIZED! GET OUT!!!'}, status=HTTP_401_UNAUTHORIZED)
      playlist_data = PlayListSerializer(playlist).data
    except Playlist.DoesNotExist:
      return Response({'message': 'Playlist not found'}, status=HTTP_404_NOT_FOUND)
    
    for songId in request.data['songIds']:
      try:
        chosen_song = Song.objects.get(pk=songId)
        if chosen_song.id not in playlist_data['songs']:
          playlist_data['songs'].append(chosen_song.id)
        elif chosen_song.id in playlist_data['songs']:
          return Response({'message': 'This song is already in your playlist'}, status=HTTP_200_OK)
      except Song.DoesNotExist:
        return Response({'message': 'Song not found'}, HTTP_404_NOT_FOUND)
    
    updated_playlist = PlayListSerializer(playlist, data=playlist_data)
    if updated_playlist.is_valid():
      updated_playlist.save()
      return Response(updated_playlist.data, status=HTTP_202_ACCEPTED)
    
    return Response({'message': 'SOMETHING IS VERY WRONG!!!'}, status=HTTP_202_ACCEPTED)

class RemoveSongFromPlaylist(APIView):

  permission_classes = (IsAuthenticated, )

  def post(self, request, pk):
    try:
      playlist = Playlist.objects.get(pk=pk)
      if request.user.id != playlist.owner.id:
        return Response({'message': 'UNAUTHORIZED! GET OUT!!!'}, status=HTTP_401_UNAUTHORIZED)
      playlist_data = PlayListSerializer(playlist).data
    except Playlist.DoesNotExist:
      return Response({'message': 'Playlist not found'}, status=HTTP_404_NOT_FOUND)
    
    for songId in request.data['songIds']:
      try:
        chosen_song = Song.objects.get(pk=songId)
        if chosen_song.id in playlist_data['songs']:
          playlist_data['songs'].remove(chosen_song.id)
        elif chosen_song.id not in playlist_data['songs']:
          return Response({'message': 'This song is not in your playlist'}, status=HTTP_200_OK)
      except Song.DoesNotExist:
        return Response({'message': 'Song not found'}, HTTP_404_NOT_FOUND)
    
    updated_playlist = PlayListSerializer(playlist, data=playlist_data)
    if updated_playlist.is_valid():
      updated_playlist.save()
      return Response(updated_playlist.data, status=HTTP_202_ACCEPTED)
    
    return Response({'message': 'SOMETHING IS VERY WRONG!!!'}, status=HTTP_202_ACCEPTED)