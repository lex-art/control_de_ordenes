""" Ventas Viewset """
import json

# Models
from api.models import Sale
from api.models import Sale_detail
from api.models import Product
from api.models import Seller
from api.models import Sale_detail

# Serializers
from api.serializers import SaleReadSerializer, SaleSerializer, Sale_detailReadSerializer, Sale_detailSerializer

# Django
from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction
from django.db.models import Sum

# Django REST Framework
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

class ReportViewSet(viewsets.ModelViewSet):
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
        
    @action(methods=['get'], detail=False)
    def raw(self, request):
        try:
            queryset = Sale_detail.objects.filter(activo = True)
            total_sales = Sale_detailReadSerializer(queryset)
            return Response(total_sales.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail", str(e)})
