<!--
 * @Description: 
 * @Author: Zeffon
 * @Date: 2021-10-24 22:30:07
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-10-27 21:36:20
-->
<template>
  <div class="m-header">
    <div class="m-header__item" @click="clickOne">已完成</div>
    <div class="m-header__item is-active" @click="clickTwo">
      当前（{{ curCount }}）
    </div>
    <div class="m-header__item" @click="clickThree">数据统计</div>
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
  },
  methods: {
    clickOne() {
      console.log(1)
    },
    clickTwo() {
      console.log(2)
    },
    clickThree() {
      console.log(3)
    }
  }
})
</script>

<style lang="scss" scope></style>
