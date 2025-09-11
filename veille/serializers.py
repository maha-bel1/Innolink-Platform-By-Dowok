from rest_framework import serializers

class ItemFilterSerializer(serializers.Serializer):
    q = serializers.CharField(required=False, allow_blank=True)
    source = serializers.ListField(child=serializers.CharField(), required=False)
    tags = serializers.ListField(child=serializers.CharField(), required=False)
    severity = serializers.ListField(child=serializers.CharField(), required=False)
    date_from = serializers.DateTimeField(required=False)
    date_to = serializers.DateTimeField(required=False)
    sort = serializers.ChoiceField(choices=["-published_at", "published_at"], required=False, default="-published_at")

class AlertRuleSerializer(serializers.Serializer):
    id = serializers.CharField(required=False)
    name = serializers.CharField()
    active = serializers.BooleanField(default=True)

    # mêmes champs que le filtre
    q = serializers.CharField(required=False, allow_blank=True)
    source = serializers.ListField(child=serializers.CharField(), required=False)
    tags = serializers.ListField(child=serializers.CharField(), required=False)
    severity = serializers.ListField(child=serializers.CharField(), required=False)
    date_window_hours = serializers.IntegerField(required=False, min_value=1, default=24)

    # livraison
    emails = serializers.ListField(child=serializers.EmailField(), required=False)
    webhook_url = serializers.URLField(required=False, allow_blank=True)
