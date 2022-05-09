<script setup>
import TheNav from './components/TheNav.vue'
import MainView from './components/MainView.vue'
</script>

<template>
  <header>
    <TheNav />
  </header>

  <main>
    <MainView />
  </main>
</template>

<style lang='scss'>
@import 'scss/app.scss';
</style>