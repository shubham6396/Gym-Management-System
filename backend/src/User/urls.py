from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'addUser', views.addUser),
    url(r'authUser',views.authUser),
]
