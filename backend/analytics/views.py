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

    sla_breached = Complaint.objects.filter(
        status="ESCALATED"
    ).count()

    return Response({
        "total": total,
        "open": open_count,
        "resolved": resolved_count,
        "sla_breached": sla_breached
    })