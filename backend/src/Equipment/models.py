from django.db import models

# Create your models here.
class Equipment(models.Model):
    equipmentId = models.AutoField(primary_key=True, db_column="EQUIPMENT_ID", unique=True)
    sportId = models.IntegerField(db_column="SPORT_ID")
    equipmentAvailable = models.BooleanField(default=False, db_column="EQUIPMENT_AVAILABLE")
    equipmentName = models.CharField(max_length=50,db_column="EQUIPMENT_NAME")
    class Meta:
        db_table = "EQUIPMENT"