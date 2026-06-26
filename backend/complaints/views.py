from django.core.mail import send_mail
from django.conf import settings

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .models import (
    Complaint,
    ComplaintAttachment,
    ComplaintHistory,
)

from .serializers import (
    ComplaintSerializer,
    ComplaintAttachmentSerializer,
)


class ComplaintViewSet(viewsets.ModelViewSet):

    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer

    def get_queryset(self):

        user = self.request.user

        # Admin -> All complaints
        if user.role == "ADMIN":
            return Complaint.objects.all()

        # Manager -> All complaints
        if user.role == "MANAGER":
            return Complaint.objects.all()

        # Officer -> Only assigned complaints
        if user.role == "OFFICER":
            return Complaint.objects.filter(
                assigned_to=user
            )

        # Employee -> Only own complaints
        return Complaint.objects.filter(
            created_by=user
        )

    def perform_create(self, serializer):

        complaint = serializer.save(
            created_by=self.request.user
        )

        ComplaintHistory.objects.create(
            complaint=complaint,
            performed_by=self.request.user,
            action="Complaint Created"
        )

        # Send Email
        if self.request.user.email:
            send_mail(
                subject=f"Complaint #{complaint.id} Created Successfully",
                message=(
                    f"Hello {self.request.user.first_name or self.request.user.username},\n\n"
                    f"Your complaint has been registered successfully.\n\n"
                    f"Complaint ID: {complaint.id}\n"
                    f"Title: {complaint.title}\n"
                    f"Category: {complaint.category}\n"
                    f"Priority: {complaint.priority}\n"
                    f"Status: {complaint.status}\n\n"
                    f"We will notify you whenever there is an update.\n\n"
                    f"Regards,\n"
                    f"IOCL Smart Complaint Management System"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[self.request.user.email],
                fail_silently=True,
            )

    def perform_update(self, serializer):

        old_complaint = self.get_object()

        old_status = old_complaint.status
        old_assigned_to = old_complaint.assigned_to

        # Employee can only edit own complaint
        if (
            self.request.user.role == "EMPLOYEE"
            and old_complaint.created_by != self.request.user
        ):
            raise PermissionDenied(
                "You can only update your own complaints."
            )

        complaint = serializer.save()

        # Assignment
        if complaint.assigned_to != old_assigned_to:

            if self.request.user.role not in [
                "ADMIN",
                "MANAGER"
            ]:
                raise PermissionDenied(
                    "Only Managers and Admins can assign complaints."
                )

            assigned_user = (
                complaint.assigned_to.username
                if complaint.assigned_to
                else "Unassigned"
            )

            ComplaintHistory.objects.create(
                complaint=complaint,
                performed_by=self.request.user,
                action=f"Assigned to {assigned_user}"
            )

        # Status change
        if complaint.status != old_status:

            ComplaintHistory.objects.create(
                complaint=complaint,
                performed_by=self.request.user,
                action=f"Status changed to {complaint.status}"
            )

        # Resolution notes
        if complaint.resolution_notes:

            exists = ComplaintHistory.objects.filter(
                complaint=complaint,
                action="Resolution Notes Updated"
            ).exists()

            if not exists:

                ComplaintHistory.objects.create(
                    complaint=complaint,
                    performed_by=self.request.user,
                    action="Resolution Notes Updated"
                )

    def destroy(self, request, *args, **kwargs):

        if request.user.role != "ADMIN":
            raise PermissionDenied(
                "Only Admin can delete complaints."
            )

        return super().destroy(
            request,
            *args,
            **kwargs
        )

    @action(
        detail=True,
        methods=["post"],
        url_path="upload-attachment"
    )
    def upload_attachment(self, request, pk=None):

        complaint = self.get_object()

        uploaded_file = request.FILES.get("file")

        if not uploaded_file:

            return Response(
                {
                    "error": "No file uploaded"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        attachment = ComplaintAttachment.objects.create(
            complaint=complaint,
            file=uploaded_file
        )

        ComplaintHistory.objects.create(
            complaint=complaint,
            performed_by=request.user,
            action=f"Attachment uploaded: {uploaded_file.name}"
        )

        serializer = ComplaintAttachmentSerializer(
            attachment
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )