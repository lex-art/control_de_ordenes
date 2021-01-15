# Django
from django.db import models

# Models
from api.models.seller import Seller 


class Product(models.Model):
    """
        Tabla que almacena los tados del producto
    """
    name = models.CharField("nombre del producto",max_length=75, blank=False, null=False)
    description =models.TextField(blank=True, null=True)
    price = models.FloatField("Costo del producto", blank=False, null=False)
    existence = models.IntegerField("cantidad de existencia", blank=False, null=False, default=0)
    img = models.ImageField("imagen del producto",upload_to='Productos', null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    provider = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name="Proveedor")

  
def delete (self): 
    self.activo = False