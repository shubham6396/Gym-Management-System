from django.shortcuts import render
import json
from .models import Sport

from .models import Sport
from Area.models import Area
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import HttpResponse
from django.http import JsonResponse
from django.db import connection
def getAllSports(request):
    try:
        # projects = Model.objects.all().values().filter(prjId=prjId)
        responseData = {}
        sport=Sport.objects.all().values().filter()
        sport_list=list(sport)
        responseData["Sports"] = sport_list
        return responseData

    except Exception as ex:
        print(ex)
        data = {}
        data["Status"] = "Failed"
        return data