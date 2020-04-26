from .models import Reservation
from datetime import datetime
from User.models import User
from TimeSlot.models import TimeSlot
from Area.models import Area
from Equipment.models import Equipment
from Sport.models import Sport
from twilio.rest import Client
from django.conf import settings


import traceback
from django.db.models import Q


def addReservation(request):
    try:
        reservationModel = Reservation()
        reservationModel.usrId = request.GET.get("usrId")
        reservationModel.areaId = request.GET.get("areaId")
        reservationModel.equipmentId = request.GET.get("equipmentId")
        reservationModel.sportId = request.GET.get("sportId")
        reservationModel.timeSlotId = request.GET.get("timeSlotId")
        reservationModel.reservationDate = datetime.now().date()
        reservationModel.save()

        return {"reservationId": reservationModel.reservationId}
    except Exception as ex:
        print(ex)
        return {"Status": "Failed"}


def getReservationsForUser(request):
    try:
        responseData = {}

        date = datetime.now().date()
        date_string = (date.strftime("%Y-%m-%d"))
        usrId = request.GET.get("usrId")
        reservationModel = Reservation.objects.all().values().filter(usrId=usrId, reservationDate=date_string)
        responseData["Reservations"] = list(reservationModel)

        for object in responseData["Reservations"]:
            sportId = object["sportId"]
            sportName = Sport.objects.all().values("sportName").filter(sportId=sportId)
            object["sportName"] = list(sportName)[0]["sportName"]
            areaId = object["areaId"]
            areaName = Area.objects.all().values("areaName").filter(areaId=areaId)
            object["areaName"] = list(areaName)[0]["areaName"]
            equipmentId = object["equipmentId"]
            equipmentName = Equipment.objects.all().values("equipmentName").filter(equipmentId=equipmentId)
            object["equipmentName"] = list(equipmentName)[0]["equipmentName"]
            timeSlotId = object["timeSlotId"]
            startTime = TimeSlot.objects.all().values("startTime").filter(timeSlotId=timeSlotId)
            object["startTime"] = list(startTime)[0]["startTime"]
            endTime = TimeSlot.objects.all().values("endTime").filter(timeSlotId=timeSlotId)
            object["endTime"] = list(endTime)[0]["endTime"]

        return responseData

    except Exception as ex:
        print(traceback.print_exc())
        responseData = {"Status": "Failed"}
        return responseData


def getAllReservations(request):
    try:
        responseData = {}
        date = datetime.now().date()
        date_string = (date.strftime("%Y-%m-%d"))
        reservationModel = Reservation.objects.all().values().filter(reservationDate=date_string)
        responseData["Reservations"] = list(reservationModel)

        for object in responseData["Reservations"]:
            usrId = object["usrId"]
            usrLoginName = User.objects.all().values("usrLoginName").filter(usrId=usrId)
            object["usrLoginName"] = list(usrLoginName)[0]["usrLoginName"]
            usrFirstName = User.objects.all().values("usrFirstName").filter(usrId=usrId)
            object["usrFirstName"] = list(usrFirstName)[0]["usrFirstName"]
            usrLastName = User.objects.all().values("usrLastName").filter(usrId=usrId)
            object["usrLastName"] = list(usrLastName)[0]["usrLastName"]
            usrEmailId = User.objects.all().values("usrEmailId").filter(usrId=usrId)
            object["usrEmailId"] = list(usrEmailId)[0]["usrEmailId"]
            sportId = object["sportId"]
            sportName = Sport.objects.all().values("sportName").filter(sportId=sportId)
            object["sportName"] = list(sportName)[0]["sportName"]
            areaId = object["areaId"]
            areaName = Area.objects.all().values("areaName").filter(areaId=areaId)
            object["areaName"] = list(areaName)[0]["areaName"]
            equipmentId = object["equipmentId"]
            equipmentName = Equipment.objects.all().values("equipmentName").filter(equipmentId=equipmentId)
            object["equipmentName"] = list(equipmentName)[0]["equipmentName"]
            timeSlotId = object["timeSlotId"]
            startTime = TimeSlot.objects.all().values("startTime").filter(timeSlotId=timeSlotId)
            object["startTime"] = list(startTime)[0]["startTime"]
            endTime = TimeSlot.objects.all().values("endTime").filter(timeSlotId=timeSlotId)
            object["endTime"] = list(endTime)[0]["endTime"]

        return responseData

    except Exception as ex:
        print(traceback.print_exc())
        responseData = {"Status": "Failed"}
        return responseData

def cancelReservation(request):
    try:
        reservationId = request.GET.get("reservationId")
        reservationModel = Reservation.objects.get(reservationId=reservationId)
        if reservationModel.waitlist is not None:
            userModel = User.objects.get(usrId=reservationModel.waitlist)
            contactNumber = (userModel.usrContact)
            message_to_broadcast="The reservation slot which you want is now available. Please login to book it."
            client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
            client.messages.create(to=contactNumber,
                                   from_=settings.TWILIO_NUMBER,
                                   body=message_to_broadcast)
        reservationModel.delete()
        responseData = {"Status": "Success", "reservationId": reservationId}
        return responseData
    except Exception as ex:
        print(traceback.print_exc())
        responseData = {"Status": "Failed"}
        return responseData