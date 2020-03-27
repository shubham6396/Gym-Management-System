from django.http import JsonResponse
from . import timeSlotService
from . import  timeSlotService
def getAllTimeSlots(request):
    try:
        responseData = timeSlotService.getAllTimeSlots(request)
        if responseData is None:
            responseData["Status"] = "Failed"

        return JsonResponse(responseData)
    except Exception as ex:
        print("[EXCEPTION] Getting time slots : ")
        print(ex)
        responseData = {"Status": "Failed"}
        return JsonResponse(responseData)