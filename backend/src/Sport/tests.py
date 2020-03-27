from django.test import TestCase, RequestFactory
from .models import Sport
from django.conf import settings
from .views import *

# Create your tests here.
class EquipmentTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.sport1 = Sport.objects.create(sportId=1, sportName="Badminton", sportMaxPlayers=4, sportMinPlayers=2, sportTeamSport=0)
        self.sport2 = Sport.objects.create(sportId=2, sportName="Basketball", sportMaxPlayers=10, sportMinPlayers=2, sportTeamSport=1)
        print("setUp called")

    def test_getAllEquipments(self):
        print("Testing Get All Sports")

        # Success Test Case
        request = self.factory.get('/sport/getAllSports')
        response = getAllSports(request)
        response_dict = json.loads(response.content)
        self.assertEqual(len(response_dict['Sports']), 2)

        self.sport1.delete() #Deleting One Sport Object

        request = self.factory.get('/sport/getAllSports')
        response = getAllSports(request)
        response_dict = json.loads(response.content)
        self.assertNotEqual(len(response_dict['Sports']), 2)
        self.assertEqual(response_dict['Sports'][0]['sportName'], "Basketball")

