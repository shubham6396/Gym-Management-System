from django.contrib import admin
from django.urls import path,include
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    url(r'user/', include('User.urls')),
    url(r'sport/', include('Sport.urls')),
    url(r'area/', include('Area.urls')),
    url(r'equipment/', include('Equipment.urls')),
    url(r'reservation/', include('Reservation.urls')),
    url(r'timeslot/', include('TimeSlot.urls')),
    url(r'staff/', include('Staff.urls')),
]
