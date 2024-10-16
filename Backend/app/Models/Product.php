<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id',
        'status',
        'user_id',
        'is_featured',
        'stock',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }

    public function purchaseHistories()
    {
        return $this->hasMany(PurchaseHistory::class);
    }

    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }

}
