<template>
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <!-- En-tête avec titre -->
            <div class="mb-8 text-center">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Historique des Commandes</h1>
                <p class="text-gray-600">Consultez vos commandes par période</p>
            </div>

            <!-- Formulaire de recherche -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Date de début</label>
                        <input
                            v-model="dateStart"
                            type="date"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Date de début">
                    </div>
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Date de fin</label>
                        <input
                            v-model="dateEnd"
                            type="date"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Date de fin">
                    </div>
                    <div class="">
                        <button
                            @click="getOrdersBetween"
                            class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                            </svg>
                            Rechercher
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tableau des résultats -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden" v-if="orders.length">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du plat</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix Unitaire</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th> -->
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.order_date_format }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.meal_name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.quantity }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.price }} FCFA</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.quantity * order.price }} FCFA</td>
                            </tr>
                        </tbody>
                        <tfoot v-if="nombre_plats_total > 0" class="bg-gray-50">
                            <tr>
                                <td colspan="3" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{{ nombre_plats_total + ' plats commandé(s)' }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{{ montant_total }} FCFA</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <!-- Message si aucune commande -->
            <div v-if="orders.length === 0" class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune commande trouvée</h3>
                <p class="mt-1 text-sm text-gray-500">Sélectionnez une période et cliquez sur rechercher pour voir les commandes.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Références réactives
const dateStart = ref('');
const dateEnd = ref('');
const orders = ref([]);
const nombre_plats_total = ref(0);
const montant_total = ref(0);

// Fonction pour récupérer les commandes
const getOrdersBetween = () => {
    // Réinitialiser les totaux
    nombre_plats_total.value = 0;
    montant_total.value = 0;

    // Vérifier si les dates sont sélectionnées
    if (!dateStart.value || !dateEnd.value) {
        alert('Veuillez sélectionner les dates de début et de fin');
        return;
    }

    // Appel API
    axios.get('orders/between', {
        params: {
            startDate: dateStart.value,
            endDate: dateEnd.value
        }
    }).then(({ data }) => {
        orders.value = data.data;
        orders.value.forEach((order) => {
            nombre_plats_total.value += order.quantity;
            montant_total.value += (order.quantity * order.price);
        });
        })
        .catch(error => {
            console.error('Erreur:', error);
            orders.value = [];
            nombre_plats_total.value = 0;
            montant_total.value = 0;
            alert('Une erreur est survenue lors de la récupération des commandes');
        });
};
</script>

<style scoped>
.table-container {
    @apply overflow-x-auto;
}

@media (max-width: 640px) {
    .table-container {
        @apply -mx-4;
    }
}
</style>

<style>

</style>
