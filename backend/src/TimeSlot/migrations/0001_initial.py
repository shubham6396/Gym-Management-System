from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TimeSlot',
            fields=[
                ('timeSlotId', models.AutoField(db_column='TIME_SLOT_ID', primary_key=True, serialize=False, unique=True)),
                ('startTime', models.TimeField(db_column='START_TIME')),
                ('endTime', models.TimeField(db_column='END_TIME')),
            ],
            options={
                'db_table': 'TIME_SLOT',
            },
        ),
    ]
