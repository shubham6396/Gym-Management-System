from django.test import TestCase,RequestFactory
import json
from .models import Staff
from .views import *

# Create your tests here.
class StaffTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.staff1 = Staff.objects.create(staffId=123, staffFirstName="John",staffLastName="Doe",
                            staffLoginName="jdoe",staffPassword="111",staffEmailId="jd@gmail.com",staffContact=9803192255,
                            staffRegistrationDate="2020-04-20 00:00:00.000000")

    def test_staff_login(self):
        print("testing staff login function")
        staffCreds = {'staffLoginName':'jdoe','staffPassword':'111'}
        request = self.factory.get('/staff/authStaff', staffCreds)
        response = authStaff(request)
        resp_dict = json.loads(response.content)
        staff=Staff.objects.get(staffLoginName='jdoe')
        staffId=resp_dict["Data"]["staffId"]
        self.assertEqual(staff.staffId, staffId)