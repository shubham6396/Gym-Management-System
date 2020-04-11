from django.shortcuts import render

# Create your views here.
from django.conf import settings
from django.http import HttpResponse
from twilio.rest import Client


def broadcast_sms(request):
    message_to_broadcast = ("Hi this message is to reminder that you have a reservation from 10am-11am.")
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    client.messages.create(to="9803192555",
                           from_=settings.TWILIO_NUMBER,
                           body=message_to_broadcast)
    return HttpResponse("messages sent!", 200)