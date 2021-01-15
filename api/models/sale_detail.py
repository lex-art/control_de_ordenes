# Django
from django.db import models

# Models
from .product import Product

class Sale_detail(models.Model):
    """
        Tabla que almacena el detalle de la ventas que se realiza
        por cada producto vendido
    """
    quantity = models.IntegerField("cantidad de procutos", blank=False, null=False)
    total = models.FloatField("total del producto vendido", blank=False, null=False)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=False, null=False, related_name="detalle_venta_producto")

