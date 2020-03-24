from .models import Reservation
from datetime import datetime


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


