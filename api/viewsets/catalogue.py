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
from rest_framework.decorators import action,permission_classes
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class CatalogueViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,) 
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
    # para devolver lor registros paginados y pesronalizados
    def list(self, request):
        """ Devuelve los registros paginados   """
        page = request.query_params.get('page')
        #para que el que compre sea solo productos de otro vendedor
        user = request.user.is_anonymous
        if user:            
            queryset = Product.objects.all()
        else:   
            user = request.user     
            try:
                provider_data = Seller.objects.get(user = user)
                queryset = Product.objects.all().exclude(provider= provider_data)
            except:
                print("\n\n\n No se entcontro el proveedor")
            
        #paginacion 
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ProductReadSerializer
            product = serializer(page, many=True)
            return self.get_paginated_response(product.data)

        serializer = ProductReadSerializer
        products = serializer(queryset, many=True)
        return Response(products.data)
