from Reservation.models import Reservation
from .models import TimeSlot
from datetime import datetime
import traceback

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
        print(timeSlotReserved1)
        timeSlotReserved2 = Reservation.objects.all().values('timeSlotId') \
            .filter(reservationDate=date_string, equipmentId=equipmentId)
        print(timeSlotReserved2)
        timeSlotReserved_list=list(timeSlotReserved1)+ list(timeSlotReserved2)
        #timeSlotReserved_list.append(list(timeSlotReserved2))

        timeSlotId = []
        for i in range(0,len(timeSlotReserved_list)):
            timeSlotId.append(timeSlotReserved_list[i]['timeSlotId'])
            print(timeSlotReserved_list[i]['timeSlotId'])
        timeSlotId = list(set(timeSlotId))
        print(timeSlotId)
        timeSlotIdWaitlistFull=[]
        reservationId_list=[]
        for i in range (0,len(timeSlotId)):
            reservationId = Reservation.objects.all().values('reservationId').filter(reservationDate=date_string, timeSlotId=timeSlotId[i],waitlist=None)
            if len(reservationId)!=0:
                a = {}
                b=list(reservationId)
                print(b)
                a["TimeSlotId"]=timeSlotId[i]
                a["ReservationId"]=b[0]['reservationId']
                reservationId_list.append(a)
            else:
                timeSlotIdWaitlistFull.append(timeSlotId[i])

        timeSlotAvaiable = TimeSlot.objects.exclude(timeSlotId__in=timeSlotIdWaitlistFull).all().values()
        timeSlotAvaiable_list=list(timeSlotAvaiable)
        responseData["reservationId"]=reservationId_list
        responseData["TimeSlots"] = timeSlotAvaiable_list
        responseData["Status"] = "Success"

        return responseData

    except Exception as ex:
        print(traceback.print_exc())
        data = {}
        data["Status"] = "Failed"
        return data


def addWailist(request):
    try:
        responseData={}
        userId = request.GET.get("userId")
        reservationId = request.GET.get("reservationId")
        reservationModel=Reservation.objects.get(reservationId=reservationId)
        reservationModel.waitlist=userId
        reservationModel.save()
        timeSlotId = reservationModel.timeSlotId
        print(timeSlotId)
        timeSlotAvaiable = TimeSlot.objects.exclude(timeSlotId=timeSlotId).all().values()
        timeSlotAvaiable_list = list(timeSlotAvaiable)
        responseData["TimeSlots"] = timeSlotAvaiable_list
        responseData["Status"] = "Success"
        return  responseData
    except Exception as ex:
        print(traceback.print_exc())
        data = {}
        data["Status"] = "Failed"
        return data