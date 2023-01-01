from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from apps.products.models import Product
from apps.products.serializers import ProductSerializer
from apps.category.models import Category

from django.db.models import Q

class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, productId, format=None):
        try:
            product_id=int(productId)
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        if(Product.objects.filter(id=product_id).exists()):
            product = Product.objects.get(id=product_id)
            product = ProductSerializer(product)
            return Response({
                'product': product.data
            }, status==status.HTTP_200_OK)
        else:
            return Response(
                {'error':'Product with this ID does not exits'},
                status=status.HTTP_404_NOT_FOUND)

class ListProductsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        sortBy = request.query_params.get('sortBy')
        if not (sortBy == 'date_created' or sortBy == 'prince' or sortBy == 'sold' or sortBy == 'name'):
            sortBy = 'date_created'
        order = request.query_params.get('order')
        limit = request.query_params.get('limit')

        if not limit:
            limit = 6
        try: 
            limit = int(limit)
        except:
            return Response(
                {'error': 'Limit must be an integer'},
                status = status.HTTP_404_NOT_FOUND)

        if limit <= 0:
            limit = 6

        if order == 'desc':
            sortBy = '-' + sortBy
            products = Product.objects.order_by(sortBy).all()[:int(limit)]
        elif order == 'asc':
            products = Product.objects.order_by(sortBy).all()[:int(limit)]
        else: 
            products = Product.objects.order_by(sortBy).all()

        products = ProductSerializer(products, many=True)

        if products:
            return Response({'products': products.data},status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products to list'},
                status=status.HTTP_404_NOT_FOUND
            )

class ListSearchView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data['category_id'])
        except:
            return Response(
                {'error': 'Category ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        search = data['search']

        if len(search) == 0:
            search_result = Product.objects.order_by('-data_created').all()
        else:
            search_result = Product.objects.filter(
                Q(description_icotains = search) | Q(name_icontains = search))

        if category_id == 0:
            search_result = ProductSerializer(search_result, many=True)
            return Response(
                {'search_products': search_result.data},
                status=status.HTTP_200_OK)

        #Revisar si existe categoria
        if not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'Category ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        category = Category.objects.get(id=category_id)

        if category.parent:
            # Si ka categoria tiene padre, filtrar solo la categoria  y no el padre
            search_result = search_result.order_by('-date_created').filter(category=category)
        else:
            # Si esta categoria padre no tiene hijos, filtrar sola la categoria
            if not Category.objects.filter(parent=category).exists():
                search_result = search_result.order_by('-date_created').filter(category=category)
            else:
                categories = Category.objects.filter(parent=category)
                filtered_categories = [category]

                for cat in categories:
                    filtered_categories.append(cat)
                
                filtered_categories = tuple()