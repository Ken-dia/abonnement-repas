<template>
    <div class="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">Gestion des Commandes</h1>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Calendrier -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Calendrier</h2>
                    <VDatePicker 
                        v-model="date" 
                        expanded 
                        :max-date="new Date()" 
                        locale="fr" 
                        mode="date" 
                        @dayclick="changeDate"
                        class="border-none shadow-none" 
                    />
                </div>

                <!-- Section Commandes -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <h2 class="text-xl font-semibold text-gray-800">Commandes du Jour</h2>
                        <div class="flex gap-4 w-full sm:w-auto">
                            <fwb-button 
                                color="blue" 
                                @click="getOrders"
                                class="flex-1 sm:flex-none justify-center"
                            >
                                <template #prefix>
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                    </svg>
                                </template>
                                Prévision du mois
                            </fwb-button>
                            <fwb-button 
                                color="green" 
                                @click="showModal"
                                class="flex-1 sm:flex-none justify-center"
                            >
                                <template #prefix>
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                </template>
                                Commander
                            </fwb-button>
                        </div>
                    </div>

                    <!-- Aucune commande -->
                    <div v-if="orders.length == 0" class="mt-4">
                        <fwb-alert type="info" class="bg-blue-50 text-blue-800 rounded-lg">
                            <template #prefix>
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </template>
                            Vous n'avez pas encore passé de commande {{ moment(date).calendar() }} !
                        </fwb-alert>
                    </div>

                    <!-- Liste des commandes -->
                    <div v-else class="mt-6">
                        <fwb-timeline class="space-y-6">
                            <fwb-timeline-item v-for="order in orders" :key="order.id" class="pb-6">
                                <fwb-timeline-point>
                                    <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
                                    </svg>
                                </fwb-timeline-point>
                                <fwb-timeline-content class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                                    <fwb-timeline-time class="text-sm text-gray-600 mb-1">
                                        {{ order.order_date_format }}
                                    </fwb-timeline-time>
                                    <fwb-timeline-title class="text-lg font-medium text-gray-900 mb-2">
                                        {{ order.quantity + ' plats de '+ order.meal_name }}
                                    </fwb-timeline-title>
                                    <fwb-timeline-body>
                                        <p class="text-gray-600 mb-3">Prix unitaire : {{ order.price }} FCFA</p>
                                        <div class="flex gap-3">
                                            <fwb-button
                                                size="xs"
                                                color="blue"
                                                @click="openModalUpdate(order)"
                                                class="rounded-lg"
                                            >
                                                <template #prefix>
                                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                    </svg>
                                                </template>
                                                Modifier
                                            </fwb-button>
                                            <fwb-button
                                                size="xs"
                                                color="red"
                                                @click="openModalDelete(order.id)"
                                                class="rounded-lg"
                                            >
                                                <template #prefix>
                                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                    </svg>
                                                </template>
                                                Supprimer
                                            </fwb-button>
                                        </div>
                                    </fwb-timeline-body>
                                </fwb-timeline-content>
                            </fwb-timeline-item>
                        </fwb-timeline>

                        <!-- Résumé des commandes -->
                        <div v-if="nombre_plats_total > 0 && montant_total > 0" class="mt-8 bg-green-50 rounded-lg p-4">
                            <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div class="flex items-center">
                                    <svg class="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                    </svg>
                                    <span class="font-semibold text-green-700">{{ nombre_plats_total + ' plats commandé(s)' }}</span>
                                </div>
                                <div class="flex items-center">
                                    <svg class="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span class="font-semibold text-green-700">Montant total : {{ montant_total }} FCFA</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal de suppression -->
                    <delete-modal
                        v-if="showModalDelete"
                        v-model="showModalDelete"
                        :title="'Supprimer la commande'"
                        :message="'Voulez-vous vraiment supprimer cette commande ?'"
                        :loading="loading"
                        @confirmed="deleteOrder()"
                    />
                </div>
            </div>
        </div>
        <!-- Modal de commande -->
        <fwb-modal v-if="isShowModal" @close="closeModal" size="lg">
            <template #header>
                <div class="flex items-center text-xl font-bold text-gray-900">
                    <svg class="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    {{ formTitle }}
                </div>
            </template>
            <template #body>
                <div class="space-y-6">
                    <div class="space-y-2">
                        <fwb-input 
                            v-model="form.meal_name" 
                            placeholder="Ex: Thiéboudienne" 
                            label="Nom du plat"
                            class="rounded-lg"
                        />
                        <HasError :form="form" field="meal_name" class="text-red-600 text-sm" />
                    </div>

                    <div class="space-y-2">
                        <fwb-input 
                            v-model="form.order_date" 
                            placeholder="Sélectionner une date" 
                            label="Date de commande" 
                            type="date"
                            class="rounded-lg"
                        />
                        <HasError :form="form" field="order_date" class="text-red-600 text-sm" />
                    </div>

                    <div class="space-y-2">
                        <fwb-input 
                            v-model="form.quantity" 
                            placeholder="Ex: 2" 
                            label="Quantité" 
                            type="number"
                            min="1"
                            class="rounded-lg"
                        />
                        <HasError :form="form" field="quantity" class="text-red-600 text-sm" />
                    </div>

                    <div class="space-y-2">
                        <fwb-input 
                            v-model="form.price" 
                            placeholder="Ex: 2500" 
                            label="Prix unitaire (FCFA)" 
                            type="number"
                            min="0"
                            step="500"
                            class="rounded-lg"
                        />
                        <HasError :form="form" field="price" class="text-red-600 text-sm" />
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-end gap-4">
                    <fwb-button 
                        @click="closeModal" 
                        color="alternative"
                        class="rounded-lg hover:bg-red-50"
                    >
                        <template #prefix>
                            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </template>
                        Annuler
                    </fwb-button>
                    <fwb-button 
                        @click="saveCommande" 
                        color="green"
                        class="rounded-lg"
                    >
                        <template #prefix>
                            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                        </template>
                        Enregistrer
                    </fwb-button>
                </div>
            </template>
        </fwb-modal>
    </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, reactive, ref, watchEffect } from 'vue';
import {
    FwbButton, FwbAlert, FwbModal, FwbInput, FwbTimeline,
    FwbTimelineBody,
    FwbTimelineContent,
    FwbTimelineItem,
    FwbTimelinePoint,
    FwbTimelineTime,
    FwbTimelineTitle,
} from 'flowbite-vue'
import Form from 'vform'
import moment from 'moment';
import { HasError, AlertError } from 'vform/src/components/tailwind'
import DeleteModal from '../components/modal/DeleteModal.vue';
const { proxy } = getCurrentInstance()
const date = ref(new Date())
const orders = ref([])
const showModalDelete = ref(false)
const orderSelect = ref(null)
const loading = ref(false)
const nombre_plats_total = ref(0)
const montant_total = ref(0)
const form = reactive(new Form({
    id: '',
    meal_name: '',
    quantity: 1,
    price: 2500,
    order_date: (moment(date.value, 'DD/MM/YYYY', true).format()).substring(0, 10),
}))
const attr = ref([{
        dot: 'green',
    },
])

const changeDate = () => {
    //form.date_order = (moment(date.value, 'DD/MM/YYYY', true).format()).substring(0, 10)
    getOrdersDate()
}
const formTitle = computed(() => {
    return form.id ? 'Modifier la commande' : 'Ajouter une commande'
})
watchEffect(() => {
    form.order_date = (moment(date.value, 'DD/MM/YYYY', true).format()).substring(0, 10)
})
onMounted(() => {
    // console.log('date formate',moment(date.value, 'DD/MM/YYYY', true).format().substring(0,10))
    getOrdersDate()
})
const isShowModal = ref(false)

function closeModal() {
    form.reset()
    isShowModal.value = false
}
function showModal() {
    isShowModal.value = true
}
function saveCommande() {
    if(form.id) {
        form.put('orders/' + form.id).then(({ data }) => {
            form.clear()
            form.reset()
            closeModal()
            proxy.$handleMessage('Commande modifiée avec succès', 'success')
            changeDate()
        }).catch((response) => {
            proxy.$handleMessage(response.data.message, 'error')
        })
    } else {
        form.post('order').then(({ data }) => {
        form.clear()
        form.reset()
        closeModal()
        proxy.$handleMessage('Commande ajoutée avec succès', 'success')
        changeDate()
    }).catch((response) => {
        proxy.$handleMessage(response.data.message, 'error')
    })
    }

}

const getOrdersDate = () => {
    nombre_plats_total.value = 0
    montant_total.value = 0
    axios.get('orders', { params: { selectedDate: date.value } }).then(({ data }) => {
        orders.value = data.data

    })
}
function openModalDelete(id) {
    showModalDelete.value = true
    orderSelect.value = id
}
function deleteOrder () {
    loading.value = true
    axios.delete('orders/' + orderSelect.value).then((response) => {
        loading.value = false
        showModalDelete.value = false
        orderSelect.value = null
        proxy.$handleMessage(response.data.message, 'success')
        changeDate()
    }).catch((response) => {
        loading.value = false
        proxy.$handleMessage(response.data.message, 'error')
    })
}

function openModalUpdate(order) {
    form.fill(order)
    form.order_date = (moment(date.value, 'DD/MM/YYYY', true).format()).substring(0, 10)
    isShowModal.value = true
}

function getOrders() {
    nombre_plats_total.value = 0
    montant_total.value = 0
    axios.get('orders').then(({ data }) => {

        orders.value = data.data
        orders.value.map((order) => {
            nombre_plats_total.value = nombre_plats_total.value + order.quantity;
            montant_total.value += (order.quantity * order.price)

        });
    }).catch((response) => {
        proxy.$handleMessage(response.data.message, 'error')
    })
}


</script>

<style></style>
