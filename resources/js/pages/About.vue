<template>
    <VCalendar :attributes="attributes" />
  </template>

  <script setup>
  import { ref, computed, getCurrentInstance, onMounted } from 'vue';

  const orders = ref([]);
  const { proxy } = getCurrentInstance();
  const todos = ref([
    {
      //description: 'Take Noah to basketball practice.',
      dates: [], // Every Friday
      color: 'green',
    },
  ]);

  const attributes = computed(() => [
    // Attributes for todos
    ...todos.value.map(todo => ({
      dates: orders.value.map(order => order.order_date),
      dot: {
        color: todo.color,
       // ...(todo.isComplete && { class: 'opacity-75' }),
      },
    //   popover: {
    //     label: orders.value.map(order => order.meal_name),
    //   },
    })),
  ]);
  onMounted(() => {
      getOrders()
  })
  function getOrders() {
    axios.get('orders').then(({ data }) => {
        orders.value = data.data
    }).catch((response) => {
        proxy.$handleMessage(response.data.message, 'error')
    })
}
  </script>
