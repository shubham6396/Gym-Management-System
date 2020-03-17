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
