<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id',
        'status',
        'user_id',
        'is_featured',
        'stock',
        'request_id',
        'image_path',
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

    public function request()
    {
        return $this->belongsTo(ProductRequest::class);
    }
}
