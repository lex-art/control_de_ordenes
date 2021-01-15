""" Ventas  Serializer """

# Django REST Framework
from rest_framework import serializers

# Models
from api.models.sale import Sale 

# Serializers
from api.serializers.sale_detail import Sale_detailSerializer

class SaleReadSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Sale
        fields = '__all__'
        depth = 3

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Sale
        fields = (
            'date',
            'total',
            'activo',
            'modificado',
            'seller',
            'buyer',
            'sale_detail',
        )
        