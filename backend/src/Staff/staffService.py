from .models import Staff
import json
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def authStaff(request):
    try:
        data = {}
        staffLoginName = request.GET.get('staffLoginName')
        staffPassword = request.GET.get('staffPassword')
        if Staff.objects.filter(staffLoginName=staffLoginName, staffPassword=staffPassword).exists():
            currentStaffModel = Staff.objects.get(staffLoginName=staffLoginName, staffPassword=staffPassword)
            data["staffId"] = currentStaffModel.staffId
            data["staffLoginName"] = currentStaffModel.staffLoginName
            data["staffPassword"] = currentStaffModel.staffPassword
            data["staffFirstName"] = currentStaffModel.staffFirstName
            data["staffEmailId"] = currentStaffModel.staffEmailId
            data["staffLastName"] = currentStaffModel.staffLastName
            return data
        else:
            data["Status"] = "Failed"
            return data
    except Exception as ex:
        print("[EXCEPTION] Add Staff Service : ")
        print(ex)
        data["Status"] = "Failed"
        return data