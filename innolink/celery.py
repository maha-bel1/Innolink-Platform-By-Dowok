import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "innolink.settings")

app = Celery("innolink")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
