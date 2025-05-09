<?php

use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [LoginController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('orders', [OrderController::class, 'index']);
    Route::post('order', [OrderController::class, 'store']);
    Route::delete('orders/{order}', [OrderController::class, 'destroy']);
    Route::put('orders/{order}', [OrderController::class, 'update']);
    Route::get('orders/between', [OrderController::class, 'orderBetweenDates']);
    //Route::get('orders', [OrderController::class, 'selectedDate']);
});
