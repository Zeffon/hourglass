<!--
 * @Description: popup
 * @Author: Zeffon
 * @Date: 2021-10-09 22:02:36
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-10-28 22:11:01
-->
<template>
  <div class="g-popup">
    <div class="g-popup-header">
      <MHeader curKey="two" />
    </div>
    <div class="g-popup-main">
      <draggable
        v-model="myArray"
        group="people"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <div>{{ element }}</div>
        </template>
      </draggable>
    </div>
    <div class="g-popup-footer">
      <div>设置</div>
      <div>我的</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'
import MHeader from '../components/header.vue'

export default defineComponent({
  name: 'Index',
  components: {
    draggable,
    MHeader
  },

  data() {
    return {
      myArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      drag: false
    }
  }
})
</script>

<style lang="scss" scope></style>
