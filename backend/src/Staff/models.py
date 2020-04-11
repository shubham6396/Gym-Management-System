from django.db import models

# Create your models here.
class Staff(models.Model):
    staffId = models.AutoField(primary_key=True, db_column="STAFF_ID", unique=True)
    staffFirstName = models.CharField(max_length=100, db_column="STAFF_FIRST_NAME")
    staffLastName = models.CharField(max_length=100, db_column="STAFF_LAST_NAME")
    staffLoginName = models.CharField(max_length=324, db_column="STAFF_LOGIN_NAME")
    staffPassword = models.CharField(max_length=100, db_column="STAFF_PASSWORD")
    staffEmailId = models.CharField(max_length=324, db_column="STAFF_EMAIL_ID")
    staffContact = models.CharField(max_length=20, db_column="STAFF_CONTACT")
    #staffLastLogin = models.DateTimeField(db_column="STAFF_LAST_LOGIN", blank=True, null=True)
    staffRegistrationDate = models.DateTimeField(db_column="STAFF_REGISTRATION_DATE")

    class Meta:
        db_table = "STAFF"

