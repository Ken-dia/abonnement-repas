<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = ['meal_name', 'quantity', 'price', 'order_date'];
    protected function casts(): array
    {
        return [
            'order_date' => 'datetime',
        ];
    }
}
