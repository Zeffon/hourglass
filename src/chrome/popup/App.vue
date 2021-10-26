<!--
 * @Description: 
 * @Author: Zeffon
 * @Date: 2021-10-08 21:46:02
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-10-26 21:01:21
-->
<template>
  <Popup />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Popup from './views/popup.vue'

export default defineComponent({
  name: 'App',
  components: {
    Popup
  }
})
</script>
