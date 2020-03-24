# Generated by Django 3.0.4 on 2020-03-22 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Area',
            fields=[
                ('areaId', models.AutoField(db_column='AREA_ID', primary_key=True, serialize=False, unique=True)),
                ('sportId', models.IntegerField(db_column='SPORT_ID')),
                ('areaAvailable', models.BooleanField(db_column='AREA_AVAILABLE', default=False)),
                ('areaName', models.CharField(db_column='AREA_NAME', max_length=20)),
            ],
            options={
                'db_table': 'AREA',
            },
        ),
    ]
