
from django.http import HttpResponse
from datetime import timedelta
from . import tasks

def broadcast_sms(request):
   tasks.broadcast(repeat=10,repeat_until=None)
   return HttpResponse("messages sent!", 200)
