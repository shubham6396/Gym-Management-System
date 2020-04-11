from django.shortcuts import render
from . import staffService
from .models import Staff
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def authStaff(request):
    try:
        if request.method == 'GET':
            staffLoginName=Staff.objects.all().values().filter(staffLoginName=request.GET.get("staffLoginName")).count()
            if staffLoginName==1:
                responseData = {}
                data = staffService.authStaff(request)
                if data is not None:
                    responseData["Data"] = data
                else:
                    responseData["Status"] = "Failed"


                return JsonResponse(responseData)
            else:
                print("[EXCEPTION] Staff not in database")
                responseData = {}
                responseData["Status"] = "Failed"
                return JsonResponse(responseData)

    except Exception as ex:
        print("[EXCEPTION] Auth Staff Service : ")
        print(ex)
        responseData = {}
        responseData["Status"] = "Failed"
        return JsonResponse(responseData)
