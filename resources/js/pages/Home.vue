<template>
    <div class="container mx-auto mt-12">

        <div class="grid grid-cols-2 gap-6">
            <div class="">
                <!-- <VCalendar /> -->
                <VDatePicker v-model="date" expanded :max-date="new Date()" locale="fr" mode="date" @dayclick="changeDate" />
            </div>
            <div class="border border-gray-500 p-3">
                <div class="flex justify-end">
                    <fwb-button color="green" @click="showModal">Commander</fwb-button>
                </div>
                <div v-if="orders.length == 0">

                    <div class="grid gap-4 mt-3">
                        <fwb-alert type="info" icon>
                            Vous n'avez pas encore passer une commande {{ moment(date).calendar() }}!
                        </fwb-alert>
                    </div>
                </div>
                <div v-else>
                    <fwb-timeline class="vp-raw">
                        <fwb-timeline-item v-for="order in orders" :key="order.id">
                            <fwb-timeline-point>
                                <svg aria-hidden="true" class="w-3 h-3 text-blue-600 dark:text-blue-400"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                        fill-rule="evenodd" />
                                </svg>
                            </fwb-timeline-point>
                            <fwb-timeline-content>
                                <fwb-timeline-time>
                                    {{ order.order_date_format}}

                                </fwb-timeline-time>
                                <fwb-timeline-title>
                                    {{ order.quantity +' plats de '+ order.meal_name + ' à ' + order.price + ' fcfa' }}
                                </fwb-timeline-title>
                                <fwb-timeline-body>
                                    <div class="flex gap-3 mt-3">
                                        <fwb-button
                                            size="xs" color="alternative"
                                            class="text-blue-500 border border-blue-500 hover:bg-blue-200"
                                            @click="openModalUpdate(order)"
                                        >
                                            <template #prefix>
                                                <svg class="w-4 h-4 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                                </svg>
                                            </template>
                                            Editer
                                        </fwb-button>
                                        <fwb-button
                                            size="xs"
                                            color="alternative"
                                            class="border border-red-500 text-red-500 hover:text-red-500 hover:bg-red-200"
                                            @click="openModalDelete(order.id)">
                                            <template #prefix>
                                                <svg class="w-4 h-4 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
                                                </svg>
                                            </template>
                                            Supprimer
                                        </fwb-button>
                                    </div>
                                </fwb-timeline-body>
                            </fwb-timeline-content>
                        </fwb-timeline-item>
                    </fwb-timeline>
                    <delete-modal
                        v-if="showModalDelete"
                        v-model="showModalDelete"
                        :title="'Supprimer la commande '"
                        :message="'Voulez-vous vraiment supprimer cette commande ?'"
                        :loading="loading"
                        @confirmed="deleteOrder()"
                    />
                </div>

            </div>
        </div>
        <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
                <div class="flex items-center text-lg font-semibold">
                    {{ formTitle }}
                </div>
            </template>
            <template #body>
                <fwb-input v-model="form.meal_name" placeholder="Entrer le nom du plat" label="Nom plat" />
                <HasError :form="form" field="meal_name" />
                <fwb-input v-model="form.order_date" placeholder="Choisir une date " label="Date" type="date" />
                <HasError :form="form" field="order_date" />
                <fwb-input v-model="form.quantity" placeholder="Entrer le nombre plat" label="Quantité" type="number" />
                <HasError :form="form" field="quantity" />
                <fwb-input v-model="form.price" placeholder="Entrer le prix d'un plat" label="Prix" type="number"
                 />
                <HasError :form="form" field="price" />
            </template>
            <template #footer>
                <div class="flex justify-between">
                    <fwb-button @click="closeModal" color="alternative" class="hover:text-red-600 hover:border-red-500">
                        Annuler
                    </fwb-button>
                    <fwb-button @click="saveCommande" color="green">
                        Enregistrer
                    </fwb-button>
                </div>
            </template>
        </fwb-modal>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
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

const date = ref(new Date())
const orders = ref([])
const showModalDelete = ref(false)
const orderSelect = ref(null)
const loading = ref(false)
const form = reactive(new Form({
    id: '',
    meal_name: '',
    quantity: 1,
    price: 2500,
    order_date: (moment(date.value, 'DD/MM/YYYY', true).format()).substring(0, 10),
}))

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
            console.log('data', data.data)
            form.clear()
            form.reset()
            closeModal()
            changeDate()
        })
    } else {
        form.post('order').then(({ data }) => {
        console.log('data', data.data)
        form.clear()
        form.reset()
        closeModal()
        changeDate()
    }).catch((error) => {
        console.log('error', error)
    })
    }

}

const getOrdersDate = () => {
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
        changeDate()
    }).catch((error) => {
        loading.value = false
        console.log('error', error)
    })
}

function openModalUpdate(order) {
    form.fill(order)
    form.order_date = (moment(date.value, 'DD/MM/YYYY', true).format()).substring(0, 10)
    isShowModal.value = true
}


</script>

<style></style>
