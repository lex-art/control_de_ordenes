""" Prdocuto Viewset """
import json

# Models
from api.models import Product
from api.models import Seller

# Serializers
from api.serializers import ProductReadSerializer, ProductSerializer

# Django
from django_filters.rest_framework import DjangoFilterBackend

# Django REST Framework
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name", "price")
    search_fields = ("name", "price")
    ordering_fields = ("name", "price")
    

    def get_serializer_class(self):
        """ Define los serializer para esta viewset"""
        if self.action == 'list' or self.action == "retrieve":
           return ProductReadSerializer
        else:
           return ProductSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    #funcion apra crear un producto
    def create(self, request, *args, **kwargs):
       
        try: 
            data = request.data  
            user = request.user 
            product = Product.objects.create(
                name = data.get('name'),
                description = data.get('description'),
                price = data.get('price'),
                existence = data.get('existence'),
                provider = Seller.objects.get(user = user)
            )
            serializer = self.get_serializer_class()
            product_serializer = serializer(product)
            return Response(product_serializer.data, status = status.HTTP_200_OK)
        except Exception as e:
            print('error:', str(e))
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)
    #Devuelve los registros paginados 
    def list(self, request):      
        page = request.query_params.get('page')
        user = request.user          
        #obtiene los productos del usuario
        queryset = Product.objects.filter(provider= user.id)
        print("el nombre del usuario es_ ", user.id)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer_class()
            product = serializer(page, many=True)
            return self.get_paginated_response(product.data)

        serializer = self.get_serializer_class()
        products = serializer(queryset, many=True)
        return Response(products.data)
