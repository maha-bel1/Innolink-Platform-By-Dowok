from django.db import models
from django.utils import timezone


# --- User Model ---
class User(models.Model):
    ROLE_CHOICES = [
        ('investor', 'Investor'),
        ('researcher', 'Researcher'),
    ]

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    google_token = models.CharField(max_length=255, null=True, blank=True)  # For Google Calendar integration

    def __str__(self):
        return self.name


# --- Financing Model ---
class Financing(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('closed', 'Closed'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    amount = models.FloatField()
    deadline = models.DateTimeField()
    investor_name = models.CharField(max_length=255, default='Anonymous')# <-- IMPORTANT
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.title} ({self.status})"

# --- Application Model ---
class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    financing = models.ForeignKey(Financing, on_delete=models.CASCADE, related_name="applications")
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applications")
    proposal = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    applied_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.applicant.name} → {self.financing.title} ({self.status})"


