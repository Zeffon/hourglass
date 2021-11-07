<!--
 * @Description: 
 * @Author: Zeffon
 * @Date: 2021-10-30 21:11:58
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-03 22:34:26
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
      <div></div>
      <div class="m-table__item-op"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MLevel from './level.vue'
import { ref } from 'vue'

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
