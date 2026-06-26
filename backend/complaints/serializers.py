from rest_framework import serializers
from .models import (
    Complaint,
    ComplaintAttachment,
    ComplaintHistory,
)


class ComplaintAttachmentSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = ComplaintAttachment
        fields = "__all__"


class ComplaintHistorySerializer(
    serializers.ModelSerializer
):

    performed_by_username = serializers.CharField(
        source="performed_by.username",
        read_only=True
    )

    class Meta:
        model = ComplaintHistory
        fields = "__all__"


class ComplaintSerializer(
    serializers.ModelSerializer
):

    assigned_to_username = serializers.CharField(
        source="assigned_to.username",
        read_only=True
    )

    created_by_username = serializers.CharField(
        source="created_by.username",
        read_only=True
    )

    attachments = ComplaintAttachmentSerializer(
        many=True,
        read_only=True
    )

    history = ComplaintHistorySerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Complaint
        fields = "__all__"

        read_only_fields = [
            "complaint_id",
            "created_by",
        ]