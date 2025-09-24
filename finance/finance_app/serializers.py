# finance_app/serializers.py
from rest_framework import serializers
from .models import Financing, Application

class FinancingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Financing
        fields = '__all__'  # or list specific fields

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
