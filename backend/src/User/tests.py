from django.test import TestCase, RequestFactory
import json
from .models import User
import requests
from django.conf import settings
from .views import getUserInfo

print(settings.DATABASES)

# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user1 = User.objects.create(usrId=999, usrFirstName="Sumit",usrLastName="Kawale",
                            usrLoginName="sk1996",usrPassword="111",usrEmailId="s@gmail.com",usrContact=9803192255,
                            usrRegistrationDate="2020-03-18 00:00:00.000000")
        self.user2 = User.objects.create(usrId=111, usrFirstName="Shubham", usrLastName="Gandhi",
                            usrLoginName="sgg123", usrPassword="111", usrEmailId="sgg1996@gmail.com", usrContact=9803192255,
                            usrRegistrationDate="2020-04-18 00:00:00.000000")
        print("setUp called")
    def test_user_FirstName(self):
        print("testing user First Name")
        user=User.objects.get(usrId=999)
        self.assertEqual(user.usrFirstName,"Sumit")


    def test_user_UserCount(self):
        print("testing user count")
        users = User.objects.all()
        self.assertEqual(users.count(), 2)

    def test_user_login(self):
        print("testing authentication user")
        users=User.objects.get(usrId=111)
        usrLoginName = users.usrLoginName
        usrPassword = users.usrPassword
        self.assertTrue(User.objects.filter(usrLoginName=usrLoginName,usrPassword=usrPassword).exists())


