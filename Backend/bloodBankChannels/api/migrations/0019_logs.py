# Generated by Django 2.2.1 on 2019-07-29 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_auto_20190729_1749'),
    ]

    operations = [
        migrations.CreateModel(
            name='Logs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('log', models.CharField(max_length=300)),
                ('time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
