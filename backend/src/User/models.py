from django.db import models

# Create your models here.
class User(models.Model):
    usrId = models.AutoField(primary_key=True, db_column="USR_ID", unique=True)
    usrFirstName = models.CharField(max_length=100, db_column="USR_FIRST_NAME")
    usrLastName = models.CharField(max_length=100, db_column="USR_LAST_NAME")
    usrLoginName = models.CharField(max_length=324, db_column="USR_LOGIN_NAME")
    usrPassword = models.CharField(max_length=100, db_column="USR_PASSWORD")
    usrEmailId = models.CharField(max_length=324, db_column="USR_EMAIL_ID")
    usrContact = models.CharField(max_length=20, db_column="USR_CONTACT")
    #usrLastLogin = models.DateTimeField(db_column="USR_LAST_LOGIN", blank=True, null=True)
    usrRegistrationDate = models.DateTimeField(db_column="USR_REGISTRATION_DATE")

    class Meta:
        db_table = "USER"
