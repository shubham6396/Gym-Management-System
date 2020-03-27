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