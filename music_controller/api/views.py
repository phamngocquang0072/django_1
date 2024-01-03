from django.shortcuts import render
from django.http import HttpResponse
from .serializers import RoomSerializer
from rest_framework import generics
from .models import Room

# Create your views here.


class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
