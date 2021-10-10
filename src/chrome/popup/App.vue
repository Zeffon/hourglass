<template>
  <Popup />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Popup from './views/Popup.vue'

export default defineComponent({
  name: 'App',
  components: {
    Popup
  }
})
</script>
