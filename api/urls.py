from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets


router = DefaultRouter()
""" Rotas para la api """
router.register(r'user', viewsets.UserViewset)
router.register(r'product',viewsets.ProductViewSet, basename='product')
router.register(r'sale',viewsets.SaleViewSet, basename='sale')
router.register(r'report',viewsets.ReportViewSet, basename='sale')
router.register('catalogue',viewsets.CatalogueViewSet, basename='catalogue')



urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]
