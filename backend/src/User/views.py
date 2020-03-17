from django.shortcuts import render
from . import userService
import json
from django.http import JsonResponse

def addUser(request):
    try:
        if request.method == 'GET':
            responseData = {}
            data = userService.addUser(request)
            if data is not None:
                responseData["Data"] = data
            else:
                responseData["Data"] = "Failed"
            return JsonResponse(responseData)
    except Exception as ex:
        print("[EXCEPTION] Add User Service : ")
        print(ex)
        responseData = {}
        responseData["Data"] = "Failed"
        return JsonResponse(responseData)