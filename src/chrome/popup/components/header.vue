<!--
 * @Description: 
 * @Author: Zeffon
 * @Date: 2021-10-24 22:30:07
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-10-26 21:00:22
-->
<template>
  <div class="m-header">
    <div>已完成</div>
    <div>当前（{{ curCount }}）</div>
    <div>已完成</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'm-header',
  components: {},
  props: {
    curCount: {
      type: Number,
      default() {
        return 0
      }
    }
  }
})
</script>

<style lang="scss" scope></style>
