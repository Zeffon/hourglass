<!--
 * @Description: 
 * @Author: Zeffon
 * @Date: 2021-10-30 21:11:58
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-11 23:33:34
-->
<template>
  <div class="m-table">
    <div class="m-table__item" v-for="(item, index) in data" :key="index">
      <div class="m-table__item-index">{{ index + 1 + '.' }}</div>
      <div class="m-table__item-name">{{ item.name }}</div>
      <div class="m-table__item-level">
        <m-level
          v-model:name="item.level"
          @change="(name) => changeLevel(name, index)"
        />
      </div>
      <div class="m-table__item-time">{{ item.time }}min</div>
      <div class="m-table__item-op">
        <div class="icon-start">启动</div>
        <div class="icon-edit">编辑</div>
        <div class="icon-delete">删除</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MLevel from './level.vue'

export default defineComponent({
  name: 'm-table',
  components: {
    MLevel
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeLevel(val: string, index: number) {
      console.log(index + ' ' + val)
    }
  }
})
</script>
