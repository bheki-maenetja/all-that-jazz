# pylint: disable=no-member

from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK, HTTP_202_ACCEPTED, HTTP_404_NOT_FOUND, HTTP_406_NOT_ACCEPTABLE
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers import UserSerializer, PopulatedUserSerializer, UpdateUserSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from songs.models import Song
from artists.models import Artist

User = get_user_model()

# Register & Login
class RegisterView(APIView):

  def post(self, request):
    serialized_user = UserSerializer(data=request.data)
    
    if serialized_user.is_valid():
      serialized_user.save()
      return Response({'message': 'Registration Successful'})

    return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
      user = User.objects.get(email=email)

      if not user.check_password(password):
        raise PermissionDenied({'message': 'Invalid Credentials'})

      dt = datetime.now() + timedelta(days=14)
      token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')

      return Response({'token': token, 'message': f'Welcome back {user.username}'})
    except User.DoesNotExist:
      raise PermissionDenied({'message': 'Invalid Credentials'})

# User Profile
class ProfileView(APIView):

  permission_classes = (IsAuthenticated, )

  def get(self, request):
    try:
      user = User.objects.get(pk=request.user.id)
      serialized_user = PopulatedUserSerializer(user)
      return Response(serialized_user.data, status=HTTP_200_OK)
    except:
      return Response({ 'message': 'User not found' }, status=HTTP_404_NOT_FOUND)

# Like & Unlinking Songs
class LikeSong(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def post(self, request):
    user = User.objects.get(pk=request.user.id)
    user_data = UpdateUserSerializer(user).data

    for songId in request.data['songIds']:
      try:
        chosen_song = Song.objects.get(pk=songId)
        if chosen_song.id not in user_data['favourite_songs']:
          user_data['favourite_songs'].append(chosen_song.id)
        elif chosen_song.id in user_data['favourite_songs']:
          return Response({'message': 'You already like this song'}, status=HTTP_200_OK)
      except Song.DoesNotExist:
        return Response({'message': 'Song not found'}, HTTP_404_NOT_FOUND)
    
    updated_user = UpdateUserSerializer(user, data=user_data)
    if updated_user.is_valid():
      updated_user.save()
      return Response(updated_user.data, status=HTTP_202_ACCEPTED)
    
    return Response({'message': 'SOMETHING IS VERY WRONG!!!'}, status=HTTP_406_NOT_ACCEPTABLE)

class UnlikeSong(APIView):

  permission_classes = (IsAuthenticated, )

  def post(self, request):
    user = User.objects.get(pk=request.user.id)
    user_data = UpdateUserSerializer(user).data

    for songId in request.data['songIds']:
      try:
        chosen_song = Song.objects.get(pk=songId)
        if chosen_song.id in user_data['favourite_songs']:
          user_data['favourite_songs'].remove(chosen_song.id)
        elif chosen_song.id not in user_data['favourite_songs']:
          return Response({'message': 'You already don\'t like this song'}, status=HTTP_200_OK)
      except chosen_song.DoesNotExist:
        return Response({'message': 'Song not found'}, HTTP_404_NOT_FOUND)
    
    updated_user = UpdateUserSerializer(user, data=user_data)
    if updated_user.is_valid():
      updated_user.save()
      return Response(updated_user.data, status=HTTP_202_ACCEPTED)
    
    return Response({'message': 'SOMETHING IS VERY WRONG!!!'}, status=HTTP_406_NOT_ACCEPTABLE)

# Liking & Unliking Artists
class LikeArtist(APIView):

  permission_classes = (IsAuthenticated, )

  def get(self, request):
    user = User.objects.get(pk=request.user.id)
    user_data = UpdateUserSerializer(user).data

    for artistId in request.data['artistIds']:
      try:
        chosen_artist = Artist.objects.get(pk=artistId)
        if chosen_artist.id not in user_data['favourite_artists']:
          user_data['favourite_artists'].append(chosen_artist.id)
        elif chosen_artist.id in user_data['favourite_artists']:
          return Response({'message': 'You already like this artist'}, status=HTTP_200_OK)
      except chosen_artist.DoesNotExist:
        return Response({'message': 'artist not found'}, HTTP_404_NOT_FOUND)
    
    updated_user = UpdateUserSerializer(user, data=user_data)
    if updated_user.is_valid():
      updated_user.save()
      return Response(updated_user.data, status=HTTP_202_ACCEPTED)
    
    return Response({'message': 'SOMETHING IS VERY WRONG!!!'}, status=HTTP_406_NOT_ACCEPTABLE)

class UnlikeArtist(APIView):

  permission_classes = (IsAuthenticated, )

  def get(self, request):
    user = User.objects.get(pk=request.user.id)
    user_data = UpdateUserSerializer(user).data

    for artistId in request.data['artistIds']:
      try:
        chosen_artist = Artist.objects.get(pk=artistId)
        if chosen_artist.id in user_data['favourite_artists']:
          user_data['favourite_artists'].remove(chosen_artist.id)
        elif chosen_artist.id not in user_data['favourite_artists']:
          return Response({'message': 'You already don\'t like this artist'}, status=HTTP_200_OK)
      except chosen_artist.DoesNotExist:
        return Response({'message': 'artist not found'}, HTTP_404_NOT_FOUND)
    
    updated_user = UpdateUserSerializer(user, data=user_data)
    if updated_user.is_valid():
      updated_user.save()
      return Response(updated_user.data, status=HTTP_202_ACCEPTED)
    
    return Response({'message': 'SOMETHING IS VERY WRONG!!!'}, status=HTTP_406_NOT_ACCEPTABLE)