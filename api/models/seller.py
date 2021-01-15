# Django
from django.db import models

# Utilities
from django.contrib.auth.models import User

class Seller(models.Model):
    """
        Tabla que almacena los datos del vendedor para poder relacionarlo
        con su respectivo usuario.
    """
    MALE = 0
    FEMALE = 1

    GENDERS = (
        (MALE, 'MALE'),
        (FEMALE, 'FEMALE')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="seller")
    avatar = models.ImageField(upload_to='Avatar', null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.CharField(max_length=250, null=True, blank=True)
    gender = models.PositiveSmallIntegerField(choices=GENDERS, null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.user.username

    def delete(self, *args):
        user = self.user
        user.is_active = False
        user.save()
        self.active = False
        self.save()
        return True
