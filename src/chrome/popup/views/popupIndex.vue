<!--
 * @Description: popup
 * @Author: Zeffon
 * @Date: 2021-10-09 22:02:36
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-09 07:30:50
-->
<template>
  <div class="g-popup">
    <div class="g-popup-header">
      <MHeader v-model:curKey="curKey" @click="listenClick" />
    </div>
    <div class="g-popup-main">
      <MTable :data="tasks" />
    </div>
    <div class="g-popup-footer">
      <div style="cursor: pointer" @click="addTask">新增</div>
      <div @click="getTasks">设置</div>
      <div>我的</div>
    </div>
    <MTaskAdd ref="modalRef"> </MTaskAdd>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MHeader, MTable, MTaskAdd } from '../components'
import { TaskModel, Task } from '../models'

const task = new Task()
export default defineComponent({
  name: 'popup-index',
  components: {
    MHeader,
    MTable,
    MTaskAdd
  },

  data() {
    return {
      drag: false
    }
  },
  setup() {
    const modalRef = ref<null | { show: () => null }>(null)
    const curKey = ref('two')
    const tasks = ref([])
    tasks.value = task.getAllTaskFromLocal().items

    function addTask() {
      modalRef.value?.show()
    }

    function getTasks() {
      console.log(task.getAllTaskFromLocal())
      console.log(tasks)
    }

    return {
      modalRef,
      curKey,
      tasks,
      addTask,
      getTasks
    }
  },
  methods: {
    listenClick() {
      console.log(this.curKey)
    }
  }
})
</script>
