from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'addReservation', views.addReservation),
    url(r'getReservationsForUser', views.getReservationsForUser),
    url(r'getAllReservations', views.getAllReservations),
    url(r'cancelReservation', views.cancelReservation)

]