from django.shortcuts import render
from . import sportService
import json
from .models import Sport

from .models import Sport
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import HttpResponse
from django.http import JsonResponse

# Create your views here.
def getAllSports(request):
    try:
        responseData = {}
        responseData = sportService.getAllSports(request)
        return JsonResponse(responseData, safe=False)
    except Exception as ex:
        print("[EXCEPTION] Get All Information(Sport) Service : ")
        print(ex)
        responseData = {}
        responseData["Status"] = "Failed"
        return JsonResponse(responseData)