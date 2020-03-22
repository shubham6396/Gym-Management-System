from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'getAllSports', views.getAllSports),
]