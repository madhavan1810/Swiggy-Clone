from django.contrib import admin
from .models import Category, Restaurant, MenuItem, UserProfile, Order, OrderItem, CartItem

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ['name', 'rating', 'location', 'is_active', 'is_promoted']
    list_filter = ['is_active', 'is_promoted', 'rating']
    search_fields = ['name', 'location']

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'restaurant', 'price', 'is_veg', 'is_available', 'is_bestseller']
    list_filter = ['is_veg', 'is_available', 'is_bestseller', 'restaurant']
    search_fields = ['name', 'restaurant__name']

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone', 'created_at']

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'restaurant', 'status', 'total_amount', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__username', 'restaurant__name']
    inlines = [OrderItemInline]

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['user', 'menu_item', 'quantity', 'created_at']
    list_filter = ['created_at']