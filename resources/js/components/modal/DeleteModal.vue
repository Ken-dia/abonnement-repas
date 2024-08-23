<template>
    <fwb-modal v-if="isShowModal" @close="closeModal" size="md">
        <template #header>
            <div class="flex items-center text-base font-semibold">
                {{ title }}
            </div>
        </template>
        <template #body>
            <div class="text-sm">
                {{ message }}
            </div>

        </template>
        <template #footer>
        <div class="flex justify-between">
            <fwb-button @click="closeModal" color="alternative" class="hover:text-red-600 hover:border-red-500 text-red-500">
                NON
            </fwb-button>
            <fwb-button @click="emit('confirmed')" color="green" :loading="loading">
                OUI
            </fwb-button>
        </div>
        </template>
    </fwb-modal>
</template>

<script setup>
import { computed } from 'vue';
import { FwbButton, FwbModal } from 'flowbite-vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:modelValue','confirmed'])
const isShowModal = computed( {
       get() {
        return props.modelValue
       },
       set(value) {
        return emit('update:modelValue', value);
       }
    })



const closeModal = () => {
    isShowModal.value = false
}

</script>

<style>

</style>
