# Generated by Django 2.2.10 on 2020-03-20 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='songcategory',
            name='image_url',
            field=models.CharField(max_length=1000, null=True),
        ),
    ]
