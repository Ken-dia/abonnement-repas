<template>
    <div>
       <router-view></router-view>
       <notifications group="foo" position="bottom right" :duration="10000"></notifications>
    </div>
</template>

<script setup>
</script>

<style>

</style>
