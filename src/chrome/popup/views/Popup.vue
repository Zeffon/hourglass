<template>
  <div class="g-popup">
    <Home />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from '@/chrome/popup/views/Index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Home
  }
})
</script>

<style lang="scss"></style>
