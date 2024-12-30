<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'firstname',
        'lastname',
        'email',
        'password',
        'phone_number',
        'birth_date',
        'picture',
        'gender',
        'status',
        'session',
        'remember_token',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (empty($user->role_id)) {
                $user->role_id = 3;
            }
        });
    }

    public function passwordResets()
    {
        return $this->hasMany(PasswordReset::class);
    }

    public function failedLogins()
    {
        return $this->hasMany(FailedLogin::class);
    }

    public function notifications()
    {
        return $this->belongsToMany(Notification::class, 'notification_users');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function purchaseHistories()
    {
        return $this->hasMany(PurchaseHistory::class);
    }

    public function shoppingCarts()
    {
        return $this->hasMany(ShoppingCart::class);
    }

    public function userLocations()
    {
        return $this->hasMany(UserLocation::class);
    }

    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
