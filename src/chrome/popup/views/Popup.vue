<!--
 * @Description: popup
 * @Author: Zeffon
 * @Date: 2021-10-09 22:02:36
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-10-24 22:38:37
-->
<template>
  <div class="g-popup">
    <div class="g-popup-header">当前任务（3）项</div>
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
      <div>编辑</div>
      <div>启动</div>
      <div>设置</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'

export default defineComponent({
  name: 'Index',
  components: {
    draggable
  },

  data() {
    return {
      myArray: [1, 2, 3, 4],
      drag: false
    }
  }
})
</script>

<style lang="scss" scope></style>
