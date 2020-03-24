from django.shortcuts import render
from . import areaService
import json
from .models import Area
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import HttpResponse
from django.http import JsonResponse

# Create your views here.
def getAllAreas(request):
    try:
        responseData = {}
        responseData = areaService.getAllAreas(request)
        return JsonResponse(responseData, safe=False)
    except Exception as ex:
        print("[EXCEPTION] Get All Information(Sport) Service : ")
        print(ex)
        responseData = {"Status": "Failed"}
        return JsonResponse(responseData)