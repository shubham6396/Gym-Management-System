from django.test import TestCase,RequestFactory
import json
from .models import Reservation
from User.models import User
from Area.models import Area
from Sport.models import Sport
from Equipment.models import Equipment
from TimeSlot.models import TimeSlot
from .views import *

# Create your tests here.
class ReservationTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create(usrId=1, usrFirstName="Sumit", usrLastName="Kawale",
                                         usrLoginName="sk1996", usrPassword="111", usrEmailId="s@gmail.com",
                                         usrContact=9803192255,
                                         usrRegistrationDate="2020-03-18 00:00:00.000000")
        self.sport=Sport.objects.create(sportId=1,sportName="Soccer",sportMaxPlayers=22,sportMinPlayers=10,sportTeamSport=1)
        self.area=Area.objects.create(areaId=1,sportId=1,areaAvailable=1,areaName="Court 1")
        self.equipment=Equipment.objects.create(equipmentId=1,sportId=1,equipmentAvailable=1,equipmentName="Ball")
        self.timeslot=TimeSlot.objects.create(timeSlotId=1,startTime="10:00:00.000000",endTime="11:00:00.000000")
        self.reservation = Reservation.objects.create(reservationId=1, usrId=1, areaId=1,
                                         equipmentId=1, sportId=1, timeSlotId=1,
                                         reservationDate="2020-03-27")
        # self.reservation1 = Reservation.objects.create(reservationId=2, usrId=1, areaId=2,
        #                                                equipmentId=2, sportId=1, timeSlotId=5,
        #                                                reservationDate="2020-03-27")
    def test_getReservationsForUser(self):
        print("testing Reservation")
        usrId = {'usrId': 1}
        request = self.factory.get('/reservation/getReservationsForUser', usrId)
        response = getReservationsForUser(request)
        resp_dict = json.loads(response.content)
        reservation = Reservation.objects.all()
        self.assertEqual(reservation.count(), 1)

    def test_addReservation(self):
        print("testing add reservation")
        reservation_info={'usrId':1,'areaId':4,'equipmentId':1,'sportId':3,'timeSlotId':5}
        request = self.factory.get('/reservation/addReservation', reservation_info)
        response = addReservation(request)
        resp_dict = json.loads(response.content)
        reservation = Reservation.objects.all()

        self.assertEqual(reservation.count(), 2)

    def test_cancelReservation(self):
        print("testing cancel reservation")
        reservation_id={'reservationId':1}
        request = self.factory.get('/reservation/cancelReservation', reservation_id)
        response = cancelReservation(request)
        resp_dict = json.loads(response.content)
        reservation = Reservation.objects.all()
        self.assertEqual(reservation.count(),0 )