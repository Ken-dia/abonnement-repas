<template>
    <div>

        <div class="container mx-auto mt-12">
            <div class="grid grid-cols-3 gap-6 bg-slate-100 p-6" v-if="orders.length==0">
                <input v-model="dateStart" type="date" class="form-control" placeholder="Enter date debut">
                <input v-model="dateEnd" type="date" class="form-control" placeholder="Enter date fin">
                <div class="">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3" @click="getOrdersBetween">Rechercher</button>
                </div>
            </div>
            <!-- <div class="flex justify-end">
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3" @click="getOrdersBetween">Rechercher</button>
            </div> -->
            <fwb-table class="mt-6" v-if="orders.length">
                <fwb-table-head>
                <fwb-table-head-cell>Date</fwb-table-head-cell>
                <fwb-table-head-cell>Nom</fwb-table-head-cell>
                <fwb-table-head-cell>Nombre</fwb-table-head-cell>
                <fwb-table-head-cell>Prix Unitaire</fwb-table-head-cell>
                <fwb-table-head-cell>Montant</fwb-table-head-cell>
                <!-- <fwb-table-head-cell>
                    <span class="sr-only">Edit</span>
                </fwb-table-head-cell> -->
                </fwb-table-head>
                <fwb-table-body>
                <fwb-table-row v-for="{ id, meal_name, quantity, price,order_date_format } in orders" :key="id">
                    <fwb-table-cell>{{ order_date_format }}</fwb-table-cell>
                    <fwb-table-cell>{{ meal_name }}</fwb-table-cell>
                    <fwb-table-cell>{{ quantity }}</fwb-table-cell>
                    <fwb-table-cell>{{ price }}</fwb-table-cell>
                    <fwb-table-cell>{{ price * quantity }}</fwb-table-cell>
                </fwb-table-row>
                <fwb-table-row>
                    <fwb-table-cell class="text-xl"> {{ nombre_plats_total + ' plats commandé(s)'}}  </fwb-table-cell>
                    <fwb-table-cell>  </fwb-table-cell>
                    <fwb-table-cell>  </fwb-table-cell>
                    <fwb-table-cell>  </fwb-table-cell>
                    <fwb-table-cell class="font-bold text-black text-xl">{{ montant_total + ' Fcfa'}}</fwb-table-cell>
                </fwb-table-row>

                </fwb-table-body>
            </fwb-table>
            <!-- <fwb-card>
                <div class="" v-if="nombre_plats_total > 0 && montant_total > 0">
                            <div class="flex justify-between">
                                <div class="font-bold text-green-500">
                                    {{ nombre_plats_total + ' plats commandé(s)' }}
                                </div>
                                <div class="font-bold text-green-500">
                                    {{ 'montant : '+ montant_total + ' fcfa' }}
                                </div>
                            </div>
                </div>
            </fwb-card> -->
        </div>
    </div>
</template>

<script setup>

import axios from 'axios';
import { ref } from 'vue';
import {
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  FwbCard
} from 'flowbite-vue'
const dateStart = ref('')
const dateEnd = ref('')
const orders = ref([])
const nombre_plats_total = ref(0)
const montant_total = ref(0)
function getOrdersBetween() {
    nombre_plats_total.value = 0
    montant_total.value = 0
    axios.get('orders/between', { params: { startDate: dateStart.value, endDate: dateEnd.value } }).then(({ data }) => {
        orders.value = data.data
        orders.value.map((order) => {
            nombre_plats_total.value = nombre_plats_total.value + order.quantity;
            montant_total.value += (order.quantity * order.price)

        });
    })
}

</script>

<style>

</style>
