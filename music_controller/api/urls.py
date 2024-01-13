from django.urls import path
from .views import *

urlpatterns = [
    path("room/", RoomView.as_view(), name="room"),
    path("create/", CreateView.as_view(), name="create"),
    path("get-room/", GetRoom.as_view(), name="get-room"),
    path("join-room/", JoinRoom.as_view(), name="join-room"),
]
