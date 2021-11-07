<!--
 * @Description: popup
 * @Author: Zeffon
 * @Date: 2021-10-09 22:02:36
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-07 23:05:39
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
      <div style="cursor: pointer" @click="addTask">新增</div>
      <div>设置</div>
      <div>我的</div>
    </div>
    <MTaskAdd ref="modalRef"> </MTaskAdd>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MHeader, MTable, MTaskAdd } from '../components'

export default defineComponent({
  name: 'popup-index',
  components: {
    MHeader,
    MTable,
    MTaskAdd
  },

  data() {
    return {
      data: [
        {
          id: 1,
          name: '少数就哦啊就是好啊少数睡觉哦啊就是第三方',
          level: '重要',
          time: 30
        },
        { id: 2, name: '少数就哦啊就是', level: '紧急', time: 19 },
        { id: 3, name: '少数就哦啊就是', level: '一般', time: 42 },
        { id: 4, name: '少数就哦啊就是', level: '重要', time: 33 }
      ],
      drag: false
    }
  },
  setup() {
    const modalRef = ref<null | { show: () => null }>(null)
    const curKey = ref('two')

    function addTask() {
      modalRef.value?.show()
    }

    return {
      modalRef,
      addTask,
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
