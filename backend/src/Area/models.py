from django.db import models

# Create your models here.
class Area(models.Model):
    areaId = models.AutoField(primary_key=True, db_column="AREA_ID", unique=True)
    sportId = models.IntegerField(db_column="SPORT_ID")
    # 1=Yes 0=No for team sport field
    areaAvailable = models.BooleanField(default=False,db_column="AREA_AVAILABLE")
    areaName = models.CharField(max_length=20,db_column="AREA_NAME")
    class Meta:
        db_table = "AREA"