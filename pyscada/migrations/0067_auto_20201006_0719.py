# Generated by Django 2.2.8 on 2020-10-06 07:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pyscada', '0066_auto_20201006_0718'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ComplexEvent2',
            new_name='ComplexEvent',
        ),
        migrations.RenameModel(
            old_name='ComplexEventItem2',
            new_name='ComplexEventItem',
        ),
    ]
