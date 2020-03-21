from django.db import models

# Create your models here.

class Sport(models.Model):
    sportId = models.AutoField(primary_key=True, db_column="SPORT_ID", unique=True)
    sportName = models.CharField(max_length=100, db_column="SPORT__NAME")
    #To ask why null is allowed sport name
    sportMaxPlayers = models.IntegerField(default=0, db_column="SPORT_MAX_PLAYER")
    sportMinPlayers = models.IntegerField(default=0, db_column="SPORT_MIN_PLAYER")
    # 1=Yes 0=No for team sport field
    sportTeamSport = models.BooleanField(default=True,db_column="SPORT_TEAM_SPORT")


    class Meta:
        db_table = "SPORT"