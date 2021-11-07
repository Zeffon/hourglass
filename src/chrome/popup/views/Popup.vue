<!--
 * @Description: popup
 * @Author: Zeffon
 * @Date: 2021-10-09 22:02:36
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-10-31 00:12:32
-->
<template>
  <div class="g-popup">
    <div class="g-popup-header">
      <MHeader v-model:curKey="curKey" @click="listenClick" />
    </div>
    <div class="g-popup-main">
      <MTable :data="data" />
    </div>
    <div class="g-popup-footer">
      <div>设置</div>
      <div>我的</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import draggable from 'vuedraggable'
import { MHeader, MTable } from '../components'

export default defineComponent({
  name: 'Index',
  components: {
    MHeader,
    MTable
  },

  data() {
    return {
      data: [
        { name: '少数就哦啊就是好啊少数睡觉哦啊就是第三方', level: '重要' },
        { name: '少数就哦啊就是', level: '紧急' },
        { name: '少数就哦啊就是', level: '一般' },
        { name: '少数就哦啊就是', level: '重要' }
      ],
      drag: false
    }
  },
  setup() {
    const curKey = ref('one')
    return {
      curKey
    }
  },
  methods: {
    listenClick() {
      console.log(this.curKey)
    }
  }
})
</script>

<style lang="scss" scope></style>
