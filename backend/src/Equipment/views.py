from django.shortcuts import render
from . import equipmentService
import json
from .models import Equipment
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import HttpResponse
from django.http import JsonResponse

# Create your views here.
def getAllEquipments(request):
    try:
        responseData = {}
        responseData = equipmentService.getAllEquipments(request)
        return JsonResponse(responseData, safe=False)
    except Exception as ex:
        print("[EXCEPTION] Get All Equipment Service : ")
        print(ex)
        responseData = {}
        responseData["Status"] = "Failed"
        return JsonResponse(responseData)