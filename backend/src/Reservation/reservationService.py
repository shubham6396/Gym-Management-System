from .models import Reservation
from datetime import datetime
from TimeSlot.models import TimeSlot
import datetime



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

def getAllTimeSlot(request):
    try:
        responseData={}
        # projects = Model.objects.all().values().filter(prjId=prjId)
        date=datetime.datetime.now().date()
        date_string=(date.strftime("%Y-%m-%d"))
        timeSlotReserved=Reservation.objects.all().values('timeSlotId').filter(reservationDate=date_string)
        timeSlotReserved_list=list(timeSlotReserved)
        id=[]
        for i in range(0,len(timeSlotReserved_list)):
            id.append(timeSlotReserved[i]['timeSlotId'])
        timeSlotAvaiable=TimeSlot.objects.exclude(timeSlotId__in=id).all().values()
        timeSlotAvaiable_list=list(timeSlotAvaiable)

        responseData["TimeSlots"] = timeSlotAvaiable_list
        return responseData

    except Exception as ex:
        print(ex)
        data = {}
        data["Status"] = "Failed"
        return data
