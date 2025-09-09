from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
import json
from .models import Category, Restaurant, MenuItem, CartItem, Order, OrderItem, UserProfile


def home(request):
    categories = Category.objects.all()
    restaurants = Restaurant.objects.filter(is_active=True)

    # Filter restaurants if search query
    search = request.GET.get('search', '')
    if search:
        restaurants = restaurants.filter(
            Q(name__icontains=search) |
            Q(cuisines__icontains=search)
        )

    # Sort restaurants
    sort_by = request.GET.get('sort', 'rating')
    if sort_by == 'rating':
        restaurants = restaurants.order_by('-rating')
    elif sort_by == 'delivery_time':
        restaurants = restaurants.order_by('delivery_time')
    elif sort_by == 'cost_for_two':
        restaurants = restaurants.order_by('cost_for_two')

    # Filter by rating
    min_rating = request.GET.get('min_rating')
    if min_rating:
        restaurants = restaurants.filter(rating__gte=float(min_rating))

    context = {
        'categories': categories,
        'restaurants': restaurants,
        'search': search,
        'sort_by': sort_by,
        'min_rating': min_rating,
    }
    return render(request, 'food_delivery/home.html', context)


def restaurant_detail(request, restaurant_id):
    restaurant = get_object_or_404(Restaurant, id=restaurant_id)
    menu_items = MenuItem.objects.filter(restaurant=restaurant, is_available=True).order_by('-is_bestseller', 'name')

    context = {
        'restaurant': restaurant,
        'menu_items': menu_items,
    }
    return render(request, 'food_delivery/restaurant_detail.html', context)


@csrf_exempt
@login_required
def add_to_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        menu_item_id = data.get('menu_item_id')
        quantity = data.get('quantity', 1)

        menu_item = get_object_or_404(MenuItem, id=menu_item_id)
        cart_item, created = CartItem.objects.get_or_create(
            user=request.user,
            menu_item=menu_item,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        cart_count = CartItem.objects.filter(user=request.user).count()
        return JsonResponse({'success': True, 'cart_count': cart_count})

    return JsonResponse({'success': False})


@login_required
def cart_view(request):
    cart_items = CartItem.objects.filter(user=request.user).select_related('menu_item', 'menu_item__restaurant')
    total = sum(item.menu_item.price * item.quantity for item in cart_items)

    context = {
        'cart_items': cart_items,
        'total': total,
    }
    return render(request, 'food_delivery/cart.html', context)


@csrf_exempt
@login_required
def update_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        cart_item_id = data.get('cart_item_id')
        quantity = data.get('quantity')

        cart_item = get_object_or_404(CartItem, id=cart_item_id, user=request.user)

        if quantity > 0:
            cart_item.quantity = quantity
            cart_item.save()
        else:
            cart_item.delete()

        cart_items = CartItem.objects.filter(user=request.user).select_related('menu_item')
        total = sum(item.menu_item.price * item.quantity for item in cart_items)
        cart_count = cart_items.count()

        return JsonResponse({
            'success': True,
            'total': total,
            'cart_count': cart_count
        })

    return JsonResponse({'success': False})


@csrf_exempt
@login_required
def remove_from_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        cart_item_id = data.get('cart_item_id')

        cart_item = get_object_or_404(CartItem, id=cart_item_id, user=request.user)
        cart_item.delete()

        cart_items = CartItem.objects.filter(user=request.user).select_related('menu_item')
        total = sum(item.menu_item.price * item.quantity for item in cart_items)
        cart_count = cart_items.count()

        return JsonResponse({
            'success': True,
            'total': total,
            'cart_count': cart_count
        })

    return JsonResponse({'success': False})


@login_required
def checkout(request):
    cart_items = CartItem.objects.filter(user=request.user).select_related('menu_item', 'menu_item__restaurant')

    if not cart_items:
        messages.error(request, 'Your cart is empty!')
        return redirect('food_delivery:home')

    total = sum(item.menu_item.price * item.quantity for item in cart_items)

    context = {
        'cart_items': cart_items,
        'total': total,
    }
    return render(request, 'food_delivery/checkout.html', context)


@login_required
def place_order(request):
    if request.method == 'POST':
        cart_items = CartItem.objects.filter(user=request.user).select_related('menu_item', 'menu_item__restaurant')

        if not cart_items:
            messages.error(request, 'Your cart is empty!')
            return redirect('food_delivery:home')

        delivery_address = request.POST.get('delivery_address')
        phone = request.POST.get('phone')

        if not delivery_address or not phone:
            messages.error(request, 'Please provide delivery address and phone number!')
            return redirect('food_delivery:checkout')

        # Calculate total
        total = sum(item.menu_item.price * item.quantity for item in cart_items)

        # Get restaurant (assuming all items are from same restaurant)
        restaurant = cart_items.first().menu_item.restaurant

        # Create order
        order = Order.objects.create(
            user=request.user,
            restaurant=restaurant,
            total_amount=total,
            delivery_address=delivery_address,
            phone=phone,
            estimated_delivery_time='25-30 mins'
        )

        # Create order items
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                menu_item=cart_item.menu_item,
                quantity=cart_item.quantity,
                price=cart_item.menu_item.price
            )

        # Clear cart
        cart_items.delete()

        messages.success(request, f'Order #{order.id} placed successfully!')
        return redirect('food_delivery:order_history')

    return redirect('food_delivery:checkout')


@login_required
def order_history(request):
    # prefetch_related('items__menu_item') is good for performance
    orders = Order.objects.filter(user=request.user).prefetch_related('items__menu_item')

    context = {
        'orders': orders,
    }
    return render(request, 'food_delivery/order_history.html', context)


def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            UserProfile.objects.create(user=user)
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}!')
            return redirect('food_delivery:login')
    else:
        form = UserCreationForm()

    return render(request, 'registration/register.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('food_delivery:home')
        else:
            messages.error(request, 'Invalid username or password!')

    return render(request, 'registration/login.html')


def logout_view(request):
    logout(request)
    return redirect('food_delivery:home')
