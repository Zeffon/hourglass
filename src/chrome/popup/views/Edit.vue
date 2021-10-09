<!--
 * @Description: 
 * @Author: Zeffon
 * @Date: 2021-10-09 22:13:36
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-10-09 22:16:32
-->
<template>
  <div class="g-popup">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  name: 'Edit',
  components: {
    HelloWorld
  }
})
</script>

<style lang="scss"></style>
