from django.test import TestCase, RequestFactory
from .models import Equipment
from django.conf import settings
from .views import *

# Create your tests here.
class EquipmentTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.equipment1 = Equipment.objects.create(equipmentId=1, sportId=1, equipmentAvailable=1, equipmentName="Racket, Shuttle, Net")
        self.equipment2 = Equipment.objects.create(equipmentId=2, sportId=1, equipmentAvailable=1, equipmentName="Racket, Shuttle, Net")
        print("setUp called")

    def test_getAllEquipments(self):
        print("Testing Get All Equipment")
        sportId1 = {'sportId': 1}
        sportId2 = {'sportId': 2}

        # Success Test Case
        request = self.factory.get('/equipment/getAllEquipments', sportId1)
        response = getAllEquipments(request)
        response_dict = json.loads(response.content)
        self.assertEqual(sportId1['sportId'], response_dict['Equipment'][0]['sportId'])

        # Failure Test Case
        request = self.factory.get('/equipment/getAllEquipments', sportId2)
        response = getAllEquipments(request)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict["Status"], "Failed")

