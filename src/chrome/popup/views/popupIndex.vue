<!--
 * @Description: popup
 * @Author: Zeffon
 * @Date: 2021-10-09 22:02:36
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-11 23:27:13
-->
<template>
  <div class="g-popup">
    <div class="g-popup-header">
      <MHeader v-model:curKey="curKey" @click="listenClick" />
    </div>
    <div class="g-popup-main">
      <MTable :data="list" />
    </div>
    <div class="g-popup-footer">
      <div style="cursor: pointer" @click="showTask">新增</div>
      <div @click="getTasks">设置</div>
      <div>我的</div>
    </div>
    <MTaskAdd ref="modalRef" @ok="refresh"></MTaskAdd>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
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
    let tasks = reactive({
      list: task.getAllTaskFromLocal().items
    })

    function showTask() {
      modalRef.value?.show()
    }

    function getTasks() {
      console.log(task.getAllTaskFromLocal())
    }

    function refresh() {
      tasks = reactive({
        list: task.getAllTaskFromLocal().items
      })
    }

    const taskRefs = toRefs(tasks)
    return {
      modalRef,
      curKey,
      ...taskRefs,
      showTask,
      getTasks,
      refresh
    }
  },
  methods: {
    listenClick() {
      console.log(this.curKey)
    }
  }
})
</script>
