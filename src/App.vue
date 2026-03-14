<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <div class="container">
    <AppHeader />

    <router-view />

    <AppFooter />
  </div>
</template>
