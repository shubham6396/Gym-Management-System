from django.db import models


class Reservation(models.Model):
    reservationId = models.AutoField(primary_key=True, db_column="RESERVATION_ID", unique=True)
    usrId = models.IntegerField(db_column="USR_ID")
    # To ask why null is allowed sport name
    areaId = models.IntegerField(db_column="AREA_ID")
    equipmentId = models.IntegerField(db_column="EQUIPMENT_ID")
    # 1=Yes 0=No for team sport field
    sportId = models.IntegerField(db_column="SPORT_ID")
    timeSlotId = models.IntegerField(db_column="TIME_SLOT_ID")
    reservationDate = models.DateField(db_column="RESERVATION_DATE")
    waitlist = models.IntegerField(db_column="WAITLIST", null=True)

    class Meta:
        db_table = "RESERVATION"