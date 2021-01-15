""" Ventas Viewset """
import json

# Models
from api.models import Sale
from api.models import Sale_detail
from api.models import Product
from api.models import Seller

# Serializers
from api.serializers import SaleReadSerializer, SaleSerializer

# Django
from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction

# Django REST Framework
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("date", "total")
    search_fields = ("date", "total")
    ordering_fields = ("date", "total")

    def get_serializer_class(self):
        """ Define los serializer para esta viewset"""
        if self.action == 'list' or self.action == "retrieve":
           return SaleReadSerializer
        else:
           return SaleSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    # Funcion para crear una venta
    def create(self, request, *args, **kwargs):
        try:
            #Se uso transacciones para evitar inserciones a medias
            with transaction.atomic(): 
                data = request.data  
                user = request.user
                #print("\n\n\n",data)
                #se calcuila el total                
                total = float(data.get('price')) * float( data.get('cantidad'))
                #se registra el detalle de venta
                sale_detail = Sale_detail.objects.create(
                    quantity = data.get('cantidad'),
                    total = data.get('price'),
                    product = Product.objects.get(pk=data.get('id')),                  
                )
                #se registra la venta
                sale = Sale.objects.create(                    
                    total = total,
                    seller = Seller.objects.get(pk=data.get('provider')),
                    buyer = Seller.objects.get(user=user),
                    sale_detail = sale_detail
                )
                #se actualiza la existencia                
                producto = Product.objects.get(pk=data.get('id'))
                existencia = int(data.get('existence')) - int(data.get('cantidad'))
                producto.existence = existencia
                producto.save()

                serializer = self.get_serializer_class()
                sale_serializer = serializer(sale)
                return Response(sale_serializer.data, status = status.HTTP_200_OK)

        except Exception as e:
            print('error:', str(e))
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request):
        """ Devuelve los registros paginados   """
        page = request.query_params.get('page')
        queryset = Sale.objects.all()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer_class()
            sale = serializer(page, many=True)
            return self.get_paginated_response(sale.data)

        serializer = self.get_serializer_class()
        sale = serializer(queryset, many=True)
        return Response(sale.data)
