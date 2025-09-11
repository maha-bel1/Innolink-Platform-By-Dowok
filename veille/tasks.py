from celery import shared_task
from .services.alerts import run_all_active_rules

@shared_task
def evaluate_alerts():
    return run_all_active_rules()
