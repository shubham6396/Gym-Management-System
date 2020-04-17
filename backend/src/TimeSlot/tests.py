from django.test import TestCase,RequestFactory
import json
from Reservation.models import Reservation

from .models import TimeSlot
from .views import *

class TimeSlotTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.timeslot=TimeSlot.objects.create(timeSlotId=1,startTime="10:00:00.000000",endTime="11:00:00.000000")
        self.timeslot = TimeSlot.objects.create(timeSlotId=2, startTime="11:00:00.000000", endTime="12:00:00.000000")
        self.timeslot = TimeSlot.objects.create(timeSlotId=3, startTime="12:00:00.000000", endTime="13:00:00.000000")
        self.reservation = Reservation.objects.create(reservationId=1, usrId=1, areaId=1,
                                         equipmentId=1, sportId=1, timeSlotId=1,
                                         reservationDate="2020-03-28")

    def test_getAllTimeSlot(self):
        print("testing getting time slots")
        ids = {'areaId': 1,'equipmentId':1}
        request = self.factory.get('/timeslot/getAllTimeSlot', ids)
        response = getAllTimeSlots(request)
        resp_dict = json.loads(response.content)
        print(resp_dict)
        self.assertEqual(len(resp_dict['TimeSlots']), 2)