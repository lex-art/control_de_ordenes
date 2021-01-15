# Django
from django.db import models

# Models
from api.models.seller import Seller
from api.models.sale_detail import Sale_detail


class Sale(models.Model):
    """
        Tabla donde se regitran las ventas entre usuarios 
    """
    date = models.DateField("Fecha que se registra la venta", auto_now_add=True)
    total=models.FloatField("Total de la venta realizada", blank=False, null=False)

    activo = models.BooleanField(default=True)
    modificado = models.DateTimeField(auto_now=True)

    #---------------------------- Relations -------------------------------
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, null=False, blank=False, related_name='vendedor')
    buyer = models.ForeignKey(Seller, on_delete=models.CASCADE, null=False, blank=False, related_name='comprador')

    #------------------------- Detalle de la venta -----------------------
    sale_detail = models.ForeignKey(Sale_detail,  on_delete=models.CASCADE, null=False, blank=False, related_name='comprador')

