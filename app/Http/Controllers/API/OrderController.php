<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request) {
        $orders = [];
        if ($selectedDate = $request->selectedDate) {

            $selectedDate = substr($selectedDate, 0, 10);
            $orders = Order::where('order_date', $selectedDate)->get();
        }
        //$orders = Order::all();
        return OrderResource::collection($orders);
    }

    public function selectedDate(Request $request) {

    }

    public function store(OrderRequest $request) {
        $order = Order::create($request->all());
        return OrderResource::make($order);
    }
    public function update(OrderRequest $request, Order $order) {
        $order->update($request->all());
        return OrderResource::make($order);
    }

    public function destroy(Order $order) {
        $order->delete();
        return response()->json(['success' => true, 'message' => 'Commande supprimée avec succès !'], 200);
    }
}
