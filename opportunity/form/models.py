from django.db import models

# Create your models here.
from django.utils import timezone

class Position(models.Model):
    title = models.CharField(max_length=255)
    def __str__(self):
        return self.title
   

class Opportunity(models.Model):
    project_title = models.CharField(max_length=255, null=False, blank=False)

    project_context = models.TextField(blank=True, null=True)
    project_objectives = models.TextField(blank=True, null=True)
    project_challenges = models.TextField(blank=True, null=True)

    # Domains of expertise (can be JSON for multiple values)
    domains_of_expertise = models.JSONField(default=list, blank=True)

    # Collaboration details

    collaboration_type = models.ForeignKey('Position', on_delete=models.CASCADE, related_name='opportunities', null=True, blank=True)
    specific_budget = models.FloatField(blank=True, null=True)
    budget_range = models.CharField(max_length=100, blank=True, null=True)

    # Project timeline
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    # Location
    geographic_zone = models.CharField(max_length=150, blank=True, null=True)

    # File uploads (stored in MEDIA folder, not GridFS)
    attachments = models.FileField(upload_to='opportunity_files/', blank=True, null=True)
