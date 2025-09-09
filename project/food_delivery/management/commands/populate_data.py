from django.core.management.base import BaseCommand
from food_delivery.models import Category, Restaurant, MenuItem

class Command(BaseCommand):
    help = 'Populate database with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Populating database with sample data...')

        # Create categories
        categories_data = [
            {
                'name': 'Biryani',
                'image': 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
                'description': 'Aromatic rice dishes'
            },
            {
                'name': 'Pizza',
                'image': 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
                'description': 'Italian favorites'
            },
            {
                'name': 'Burger',
                'image': 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
                'description': 'Juicy burgers'
            },
            {
                'name': 'Chinese',
                'image': 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
                'description': 'Asian cuisine'
            },
            {
                'name': 'Desserts',
                'image': 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400',
                'description': 'Sweet treats'
            },
            {
                'name': 'Rolls',
                'image': 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
                'description': 'Wrapped delights'
            }
        ]

        categories = {}
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults=cat_data
            )
            categories[cat_data['name']] = category
            if created:
                self.stdout.write(f'Created category: {category.name}')

        # Create restaurants
        restaurants_data = [
            {
                'name': 'Biryani Blues',
                'description': 'Authentic biryani and Mughlai cuisine',
                'image': 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800',
                'rating': 4.3,
                'delivery_time': '30-35 mins',
                'cuisines': ['Biryani', 'North Indian', 'Mughlai'],
                'location': 'Connaught Place',
                'cost_for_two': 500,
                'is_promoted': True,
                'offer': '50% OFF up to ₹100'
            },
            {
                'name': 'Pizza Hut',
                'description': 'Delicious pizzas and Italian food',
                'image': 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
                'rating': 4.1,
                'delivery_time': '25-30 mins',
                'cuisines': ['Pizza', 'Fast Food', 'Italian'],
                'location': 'Karol Bagh',
                'cost_for_two': 600,
                'is_promoted': False,
                'offer': '30% OFF up to ₹150'
            },
            {
                'name': 'Burger King',
                'description': 'Flame-grilled burgers and fast food',
                'image': 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
                'rating': 4.2,
                'delivery_time': '20-25 mins',
                'cuisines': ['Burgers', 'Fast Food', 'American'],
                'location': 'Rajouri Garden',
                'cost_for_two': 400,
                'is_promoted': False,
                'offer': 'Buy 1 Get 1 Free'
            },
            {
                'name': 'Chinese Wok',
                'description': 'Authentic Chinese and Asian cuisine',
                'image': 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
                'rating': 4.0,
                'delivery_time': '35-40 mins',
                'cuisines': ['Chinese', 'Asian', 'Thai'],
                'location': 'Lajpat Nagar',
                'cost_for_two': 450,
                'is_promoted': False,
                'offer': '40% OFF up to ₹80'
            },
            {
                'name': 'Dessert Story',
                'description': 'Premium desserts and ice creams',
                'image': 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800',
                'rating': 4.4,
                'delivery_time': '25-30 mins',
                'cuisines': ['Desserts', 'Ice Cream', 'Bakery'],
                'location': 'Khan Market',
                'cost_for_two': 300,
                'is_promoted': False,
                'offer': 'Free delivery'
            },
            {
                'name': 'Rolls Mania',
                'description': 'Street-style rolls and fast food',
                'image': 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
                'rating': 4.2,
                'delivery_time': '20-25 mins',
                'cuisines': ['Rolls', 'Street Food', 'Fast Food'],
                'location': 'Chandni Chowk',
                'cost_for_two': 250,
                'is_promoted': True,
                'offer': '₹50 OFF on orders above ₹199'
            }
        ]

        restaurants = {}
        for rest_data in restaurants_data:
            restaurant, created = Restaurant.objects.get_or_create(
                name=rest_data['name'],
                defaults=rest_data
            )
            restaurants[rest_data['name']] = restaurant
            if created:
                self.stdout.write(f'Created restaurant: {restaurant.name}')

        # Create menu items
        menu_items_data = [
            # Biryani Blues
            {
                'restaurant': 'Biryani Blues',
                'category': 'Biryani',
                'name': 'Chicken Biryani',
                'description': 'Aromatic basmati rice cooked with tender chicken and exotic spices',
                'price': 350,
                'image': 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
                'is_veg': False,
                'is_bestseller': True,
                'rating': 4.5
            },
            {
                'restaurant': 'Biryani Blues',
                'category': 'Biryani',
                'name': 'Mutton Biryani',
                'description': 'Slow-cooked mutton with fragrant basmati rice and traditional spices',
                'price': 450,
                'image': 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
                'is_veg': False,
                'is_bestseller': False,
                'rating': 4.6
            },
            {
                'restaurant': 'Biryani Blues',
                'category': 'Biryani',
                'name': 'Veg Biryani',
                'description': 'Mixed vegetables cooked with basmati rice and aromatic spices',
                'price': 280,
                'image': 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
                'is_veg': True,
                'is_bestseller': False,
                'rating': 4.2
            },
            # Pizza Hut
            {
                'restaurant': 'Pizza Hut',
                'category': 'Pizza',
                'name': 'Margherita Pizza',
                'description': 'Classic pizza with fresh tomatoes, mozzarella, and basil',
                'price': 320,
                'image': 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
                'is_veg': True,
                'is_bestseller': True,
                'rating': 4.3
            },
            {
                'restaurant': 'Pizza Hut',
                'category': 'Pizza',
                'name': 'Pepperoni Pizza',
                'description': 'Loaded with pepperoni, mozzarella cheese, and pizza sauce',
                'price': 420,
                'image': 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
                'is_veg': False,
                'is_bestseller': False,
                'rating': 4.4
            },
            # Burger King
            {
                'restaurant': 'Burger King',
                'category': 'Burger',
                'name': 'Whopper',
                'description': 'Flame-grilled beef patty with fresh ingredients',
                'price': 250,
                'image': 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
                'is_veg': False,
                'is_bestseller': True,
                'rating': 4.4
            },
            {
                'restaurant': 'Burger King',
                'category': 'Burger',
                'name': 'Veg Whopper',
                'description': 'Plant-based patty with fresh vegetables',
                'price': 220,
                'image': 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
                'is_veg': True,
                'is_bestseller': False,
                'rating': 4.2
            }
        ]

        for item_data in menu_items_data:
            restaurant = restaurants[item_data['restaurant']]
            category = categories[item_data['category']]
            
            menu_item, created = MenuItem.objects.get_or_create(
                restaurant=restaurant,
                name=item_data['name'],
                defaults={
                    'category': category,
                    'description': item_data['description'],
                    'price': item_data['price'],
                    'image': item_data['image'],
                    'is_veg': item_data['is_veg'],
                    'is_bestseller': item_data['is_bestseller'],
                    'rating': item_data['rating']
                }
            )
            if created:
                self.stdout.write(f'Created menu item: {menu_item.name}')

        self.stdout.write(
            self.style.SUCCESS('Successfully populated database with sample data!')
        )