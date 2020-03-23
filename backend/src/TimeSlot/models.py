from django.db import models

class TimeSlot(models.Model):
    timeSlotId = models.AutoField(primary_key=True, db_column="TIME_SLOT_ID", unique=True)
    startTime = models.TimeField(db_column="START_TIME")
    endTime = models.TimeField(db_column="END_TIME")

    class Meta:
        db_table = "TIME_SLOT"

