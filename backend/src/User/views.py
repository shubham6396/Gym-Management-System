from django.shortcuts import render
from . import userService
from .models import User
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def authUser(request):
    try:
        if request.method == 'GET':
            userName=User.objects.all().values().filter(usrLoginName=request.GET.get("usrLoginName")).count()
            # institute = Institute.objects.all().values().filter(orgId=request.GET.get("orgId"))
            if(userName==1):
                responseData = {}
                data = userService.authUser(request)
                if data is not None:
                    responseData["Data"] = data
                else:
                    responseData["Status"] = "Failed"


                return JsonResponse(responseData)
            else:
                print("[EXCEPTION] User not in database")
                responseData = {}
                responseData["Status"] = "Failed"
                return JsonResponse(responseData)

    except Exception as ex:
        print("[EXCEPTION] Auth User Service : ")
        print(ex)
        responseData = {}
        responseData["Status"] = "Failed"
        return JsonResponse(responseData)

@csrf_exempt
def addUser(request):
    print(request.GET.get('usrFirstName'))
    try:

        if request.method == 'GET':
            usrIdCount = User.objects.all().values().filter(usrId=request.GET.get("usrId")).count()
            userName=User.objects.all().values().filter(usrLoginName=request.GET.get("usrLoginName")).count()
            # institute = Institute.objects.all().values().filter(orgId=request.GET.get("orgId"))
            if(userName==0 and usrIdCount==0):
                responseData = {}
                data = userService.addUser(request)
                if data is not None:
                    responseData["Data"] = data
                else:
                    responseData["Data"] = "Failed"
                return JsonResponse(responseData)
            else:
                print("[EXCEPTION] Already in database")
                responseData = {}
                responseData["Status"] = "Failed"
                return JsonResponse(responseData)

    except Exception as ex:
        print("[EXCEPTION] Add User Service : ")
        print(ex)
        responseData = {}
        responseData["Status"] = "Failed"
        return JsonResponse(responseData)