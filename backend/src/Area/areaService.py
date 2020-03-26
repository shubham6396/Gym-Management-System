from django.shortcuts import render
import json
from .models import Area
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import HttpResponse
from django.http import JsonResponse
from django.db import connection
def getAllAreas(request):
    try:
        # projects = Model.objects.all().values().filter(prjId=prjId)
        responseData = {}
        print(request.GET.get("sportId"))
        areas=Area.objects.all().values().filter(sportId=request.GET.get("sportId"))
        areas_list = list(areas)
        responseData["Area"] = areas_list
        return responseData

    except Exception as ex:
        print(ex)
        data = {}
        data["Status"] = "Failed"
        return data