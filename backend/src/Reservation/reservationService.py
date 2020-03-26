from .models import Reservation
from datetime import datetime
from TimeSlot.models import TimeSlot
from Area.models import Area
from Equipment.models import Equipment
from Sport.models import Sport
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

def getAllTimeSlots(request):
    try:
        areaId = request.GET.get("areaId")
        equipmentId = request.GET.get("equipmentId")
        responseData={}
        # projects = Model.objects.all().values().filter(prjId=prjId)
        date=datetime.now().date()
        date_string=(date.strftime("%Y-%m-%d"))

        timeSlotReserved1=Reservation.objects.all().values('timeSlotId')\
            .filter(reservationDate=date_string, areaId=areaId)
        timeSlotReserved2 = Reservation.objects.all().values('timeSlotId') \
            .filter(reservationDate=date_string, equipmentId=equipmentId)
        timeSlotReserved_list=list(timeSlotReserved1)+ list(timeSlotReserved2)
        #timeSlotReserved_list.append(list(timeSlotReserved2))

        timeSlotId = []
        for i in range(0,len(timeSlotReserved_list)):
            timeSlotId.append(timeSlotReserved_list[i]['timeSlotId'])
        timeSlotId = list(set(timeSlotId))
        print(timeSlotId)
        timeSlotAvaiable=TimeSlot.objects.exclude(timeSlotId__in=timeSlotId).all().values()
        timeSlotAvaiable_list=list(timeSlotAvaiable)

        responseData["TimeSlots"] = timeSlotAvaiable_list
        responseData["Status"] = "Success"
        return responseData

    except Exception as ex:
        print(traceback.print_exc())
        data = {}
        data["Status"] = "Failed"
        return data


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

def cancelReservation(request):
    try:
        reservationId = request.GET.get("reservationId")
        reservationModel = Reservation.objects.get(reservationId=reservationId)
        reservationModel.delete()
        responseData = {"Status": "Success", "reservationId": reservationId}
        return responseData
    except Exception as ex:
        print(traceback.print_exc())
        responseData = {"Status": "Failed"}
        return responseData