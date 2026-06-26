from django.db import models
from django.conf import settings
from departments.models import Department


class Complaint(models.Model):

    CATEGORY_CHOICES = [
        ("SAFETY", "Safety"),
        ("MAINTENANCE", "Maintenance"),
        ("OPERATIONS", "Operations"),
        ("IT", "IT"),
        ("HR", "HR"),
        ("FINANCE", "Finance"),
        ("SECURITY", "Security"),
        ("ENVIRONMENT", "Environment"),
    ]

    PRIORITY_CHOICES = [
        ("LOW", "Low"),
        ("MEDIUM", "Medium"),
        ("HIGH", "High"),
        ("CRITICAL", "Critical"),
    ]

    STATUS_CHOICES = [
        ("OPEN", "Open"),
        ("ASSIGNED", "Assigned"),
        ("IN_PROGRESS", "In Progress"),
        ("RESOLVED", "Resolved"),
        ("CLOSED", "Closed"),
        ("ESCALATED", "Escalated"),
    ]

    complaint_id = models.CharField(
        max_length=20,
        unique=True,
        blank=True
    )

    title = models.CharField(
        max_length=255
    )

    description = models.TextField()

    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES,
        default="MAINTENANCE"
    )

    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default="MEDIUM"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="OPEN"
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="created_complaints"
    )

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_complaints"
    )

    sla_deadline = models.DateTimeField(
        null=True,
        blank=True
    )

    resolution_notes = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["complaint_id"]),
            models.Index(fields=["status"]),
            models.Index(fields=["priority"]),
        ]

    def save(self, *args, **kwargs):
        if not self.complaint_id:
            last_id = Complaint.objects.count() + 1
            self.complaint_id = f"IOCL-CMP-{last_id:06d}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.complaint_id} - {self.title}"


class ComplaintAttachment(models.Model):

    complaint = models.ForeignKey(
        Complaint,
        on_delete=models.CASCADE,
        related_name="attachments"
    )

    file = models.FileField(
        upload_to="complaints/"
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.file.name


class ComplaintHistory(models.Model):

    complaint = models.ForeignKey(
        Complaint,
        on_delete=models.CASCADE,
        related_name="history"
    )

    action = models.CharField(
        max_length=255
    )

    performed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.action