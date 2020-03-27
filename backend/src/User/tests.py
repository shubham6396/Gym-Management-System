from django.test import TestCase,RequestFactory
import json
from .models import User
from .views import *

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
    def test_add_User(self):
        print("testing add user")
        usrInfo = {'usrId':91249,'usrFirstName':'Mihir','usrLastName':'Vadeyar',
                            'usrLoginName':'skasd1996','usrPassword':'111','usrEmailId':'ass@gmail.com'
                            ,'usrContact':9803192255}
        request = self.factory.get('/user/addUser',usrInfo)
        addUser(request)
        users = User.objects.all()
        self.assertEqual(users.count(), 3)

    def test_user_details(self):
        print("testing user Information")
        usrId = {'usrId': 111}
        request = self.factory.get('/user/getUserInfo',usrId)
        response = getUserInfo(request)
        resp_dict = json.loads(response.content)
        user=User.objects.get(usrId=111)
        usrFirstName=resp_dict["Data"]["usrFirstName"]
        self.assertEqual(user.usrFirstName, usrFirstName)
        usrLastName=resp_dict["Data"]["usrLastName"]
        self.assertEqual(user.usrLastName, usrLastName)
        usrLoginName = resp_dict["Data"]["usrLoginName"]
        self.assertEqual(user.usrLoginName, usrLoginName)
        usrPassword = resp_dict["Data"]["usrPassword"]
        self.assertEqual(user.usrPassword, usrPassword)
        usrEmailId = resp_dict["Data"]["usrEmailId"]
        self.assertEqual(user.usrEmailId, usrEmailId)
        usrContact = resp_dict["Data"]["usrContact"]
        self.assertEqual(user.usrContact, usrContact)

    def test_success_user_login(self):
        print("testing success login function")
        usrId = {'usrLoginName':'sgg123','usrPassword':'111'}
        request = self.factory.get('/user/authUser', usrId)
        response = authUser(request)
        resp_dict = json.loads(response.content)
        user=User.objects.get(usrLoginName='sgg123')
        usrId=resp_dict["Data"]["usrId"]
        self.assertEqual(user.usrId, usrId)

    def test_failure_user_login(self):
        print("testing success failure function")
        usrId = {'usrLoginName': 'sgg123', 'usrPassword': '123'}
        request = self.factory.get('/user/authUser', usrId)
        response = authUser(request)
        resp_dict = json.loads(response.content)
        status = resp_dict["Data"]["Status"]
        self.assertEqual("Failed", status)


