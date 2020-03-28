from django.test import TestCase, RequestFactory
from .models import Area
from django.conf import settings
from .views import *

# Create your tests here.
class AreaTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.area1 = Area.objects.create(areaId=1, sportId=1, areaAvailable=1, areaName="Court 1")
        self.area2 = Area.objects.create(areaId=2, sportId=1, areaAvailable=1, areaName="Court 2")
        print("setUp called")

    def test_getAllAreas(self):
        print("Testing Get All Areas")
        sportId1 = {'sportId': 1}
        sportId2 = {'sportId': 2}

        # Success Test Case
        request = self.factory.get('/area/getAllAreas', sportId1)
        response = getAllAreas(request)
        response_dict = json.loads(response.content)
        self.assertEqual(sportId1['sportId'], response_dict['Area'][0]['sportId'])
        self.assertEqual(len(response_dict['Area']), 2)

        # Failure Test Case
        request = self.factory.get('/area/getAllAreas', sportId2)
        response = getAllAreas(request)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict["Status"], "Failed")

