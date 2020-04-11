from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'authStaff', views.authStaff),

]
