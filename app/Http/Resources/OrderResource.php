<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        Carbon::setLocale('fr');
        return [
            'id'                => $this->id,
            'meal_name'         => $this->meal_name,
            'quantity'          => $this->quantity,
            'price'             => $this->price,
            'order_date'        => $this->order_date,
            'order_date_format' => $this->order_date->translatedFormat('d F Y')
        ];
    }
}
