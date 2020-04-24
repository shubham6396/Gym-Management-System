from background_task import background
from twilio.rest import Client
from background_task import background
from django.shortcuts import render
from TimeSlot.models import TimeSlot
from User.models import User
from Reservation.models import Reservation
from datetime import datetime

# Create your views here.
from django.conf import settings
@background(schedule=10)
def broadcast():
    date = datetime.now().date()
    date_string = (date.strftime("%Y-%m-%d"))

    reservationModel = Reservation.objects.all().values().filter(reservationDate=date_string)
    responseData = {}
    responseDatauserContact = {}

    listTimeSlotAndUserContact = []
    responseData["Reservations"] = list(reservationModel)
    for object in responseData["Reservations"]:
        listTimeStart = {}
        startTimeAndUserContact = {}
        timeSlotId = object["timeSlotId"]
        timeStart = TimeSlot.objects.all().values("startTime", "endTime").filter(timeSlotId=timeSlotId)
        listTimeStart = list(timeStart)
        userId = object["usrId"]
        userContact = User.objects.all().values("usrContact").filter(usrId=userId)
        responseDatauserContact = list(userContact)
        startTimeAndUserContact["startTime"] = (listTimeStart[0]['startTime']).hour
        startTimeAndUserContact["endTime"] = (listTimeStart[0]['endTime']).hour
        startTimeAndUserContact["usrContact"] = responseDatauserContact[0]['usrContact']
        listTimeSlotAndUserContact.append(startTimeAndUserContact)
    print(listTimeSlotAndUserContact)
    currentHour = datetime.now().time().hour

    for i in range(len(listTimeSlotAndUserContact)):
        if (listTimeSlotAndUserContact[i]['startTime'] - currentHour == 1 or listTimeSlotAndUserContact[i][
            'startTime'] - currentHour == 0):
            if(currentHour<=12):
                message_to_broadcast = ("Hi this message is a reminder that you have a reservation from "
                                        + str(listTimeSlotAndUserContact[i]['startTime']) + 'am - '
                                        + str(listTimeSlotAndUserContact[i]['endTime'])+'am')
            else:
                message_to_broadcast = ("Hi this message is a reminder that you have a reservation from "
                                        + str(listTimeSlotAndUserContact[i]['startTime']) + 'pm - '
                                        + str(listTimeSlotAndUserContact[i]['endTime']) + 'pm')
            print(message_to_broadcast)
            # client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
            # client.messages.create(to=listTimeSlotAndUserContact[i]["usrContact"],
            #                        from_=settings.TWILIO_NUMBER,
            #                        body=message_to_broadcast)

