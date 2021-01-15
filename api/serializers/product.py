""" Productos seralizer  """

# Django REST Framework
from rest_framework import serializers

# Models
from api.models.product import Product 

class ProductReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Product
        fields = (
            'name',
            'description',
            'price',
            'existence',
            'img',
            'activo',
            'creado',
            'modificado',
        )