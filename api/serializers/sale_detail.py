""" Detalle de la venta  Serializer """

# Django REST Framework
from rest_framework import serializers

# Models
from api.models.sale_detail import Sale_detail 

class Sale_detailReadSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Sale_detail
        fields = '__all__'

class Sale_detailSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Sale_detail
        fields = (
            'quantity',
            'total',  
            'activo',
            'creado',
            'modificado',
            'product',
            'sale',
        )
        depth = 1