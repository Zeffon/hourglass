<!--
 * @Description: 
 * @Author: Zeffon
 * @Date: 2021-10-08 21:46:02
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-10-24 23:06:06
-->
<template>
  <m-header></m-header>
  <tab></tab>
  <Popup />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/header/header.vue'
import Tab from './components/tab/tab.vue'
import Popup from './views/popup.vue'

export default defineComponent({
  name: 'App',
  components: {
    MHeader: Header,
    Tab,
    Popup
  }
})
</script>
