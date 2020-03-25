from .models import User
import json
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


#Change Add user method


def addUser(request):
    try:
        data = {}
        model = User()
        model.usrId = request.GET.get('usrId')
        model.usrFirstName = request.GET.get('usrFirstName')
        model.usrLastName = request.GET.get('usrLastName')
        model.usrLoginName = request.GET.get('usrLoginName')
        model.usrPassword = request.GET.get('usrPassword')
        model.usrEmailId = request.GET.get('usrEmailId')
        model.usrContact = request.GET.get('usrContact')
        model.usrRegistrationDate=datetime.now().date()
        model.save()

        data["usrId"] = model.usrId
        data["usrLoginName"] = model.usrLoginName
        data["usrPassword"] = model.usrPassword
        data["usrFirstName"] = model.usrFirstName
        data["usrLastName"] = model.usrLastName
        data["usrEmailId"] = model.usrEmailId
        data["usrContact"] = model.usrContact
        data["usrRegistrationDate"] = model.usrRegistrationDate
        return data
    except Exception as ex:
        print(ex)
        data["Status"] = "Failed"
        return data

def authUser(request):
    try:
        data = {}
        usrLoginName = request.GET.get('usrLoginName')
        usrPassword = request.GET.get('usrPassword')
        if User.objects.filter(usrLoginName=usrLoginName, usrPassword=usrPassword).exists() == True:
            currentUserModel = User.objects.get(usrLoginName=usrLoginName, usrPassword=usrPassword)
            data["usrId"] = currentUserModel.usrId
            data["usrLoginName"] = currentUserModel.usrLoginName
            data["usrPassword"] = currentUserModel.usrPassword
            data["usrFirstName"] = currentUserModel.usrFirstName
            data["usrEmailId"] = currentUserModel.usrEmailId
            data["usrLastName"] =currentUserModel.usrLastName
            return data
        else:
            data["Status"] = "Failed"
            return data
    except Exception as ex:
        print("[EXCEPTION] Add User Service : ")
        print(ex)
        data["Status"] = "Failed"
        return data


def getUserInfo(request):
    try:
        data = {}
        usrId = request.GET.get('usrId')
        if User.objects.filter(usrId=usrId).exists():
            currentUserModel = User.objects.get(usrId=usrId)
            data["usrId"] = currentUserModel.usrId
            data["usrLoginName"] = currentUserModel.usrLoginName
            data["usrPassword"] = currentUserModel.usrPassword
            data["usrFirstName"] = currentUserModel.usrFirstName
            data["usrEmailId"] = currentUserModel.usrEmailId
            data["usrLastName"] = currentUserModel.usrLastName
            data["usrContact"] = currentUserModel.usrContact
            data["usrRegistrationDate"] = currentUserModel.usrRegistrationDate
            return data
        else:
            data["Status"] = "Failed"
            return data
    except Exception as ex:
        print("[EXCEPTION] Get User Info Service : ")
        print(ex)
        data["Status"] = "Failed"
        return data