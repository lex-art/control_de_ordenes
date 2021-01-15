from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Seller


class SellerSerializer(serializers.ModelSerializer):
    """
        Serializar para devolver los datos necesatios que 
        se utilizar para leer, actualizar o eliminar 
        resgistros 
    """
    class Meta:
        model = Seller
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):

    seller = SellerSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'seller',
            'password'
        )

class UserReadSerializer(serializers.ModelSerializer):
    seller = SellerSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'seller',
        )
