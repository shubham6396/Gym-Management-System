from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'addReservation', views.addReservation),
    url(r'getAllTimeSlots', views.getAllTimeSlots),
    url(r'getReservationsForUser', views.getReservationsForUser),
    url(r'cancelReservation', views.cancelReservation)

]