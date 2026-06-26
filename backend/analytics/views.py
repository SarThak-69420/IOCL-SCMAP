from django.utils import timezone
from django.db.models import Count

from rest_framework.response import Response
from rest_framework.decorators import api_view

from complaints.models import Complaint


@api_view(["GET"])
def dashboard_stats(request):

    total = Complaint.objects.count()

    open_count = Complaint.objects.filter(
        status="OPEN"
    ).count()

    resolved_count = Complaint.objects.filter(
        status="RESOLVED"
    ).count()

    critical_count = Complaint.objects.filter(
        priority="CRITICAL"
    ).count()

    sla_breached = Complaint.objects.filter(
        sla_deadline__lt=timezone.now()
    ).exclude(
        status__in=["RESOLVED", "CLOSED"]
    ).count()

    assigned_count = Complaint.objects.exclude(
        assigned_to=None
    ).count()

    unassigned_count = Complaint.objects.filter(
        assigned_to=None
    ).count()

    # -------- Charts --------

    status_chart = list(
        Complaint.objects.values("status")
        .annotate(count=Count("id"))
        .order_by()
    )

    priority_chart = list(
        Complaint.objects.values("priority")
        .annotate(count=Count("id"))
        .order_by()
    )

    category_chart = list(
        Complaint.objects.values("category")
        .annotate(count=Count("id"))
        .order_by()
    )

    return Response({

        # KPI Cards
        "total": total,
        "open": open_count,
        "resolved": resolved_count,
        "critical": critical_count,
        "sla_breached": sla_breached,
        "assigned": assigned_count,
        "unassigned": unassigned_count,

        # Charts
        "status_chart": status_chart,
        "priority_chart": priority_chart,
        "category_chart": category_chart,
    })