<!--
 * @Description: popup
 * @Author: Zeffon
 * @Date: 2021-10-09 22:02:36
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-13 15:11:44
-->
<template>
  <div class="g-popup">
    <div class="g-popup-header">
      <MHeader
        v-model:curKey="curKey"
        :curCount="items.length"
        @click="listenClick"
      />
    </div>
    <div class="g-popup-main">
      <MTable
        ref="tableRef"
        :data="items"
        @delete="removeTask"
        @start="start"
        @stop="stop"
        @finish="finish"
      />
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
import { Task, TaskModel, TASK_STATUS } from '../models'

interface DataProps {
  items: TaskModel[]
  refresh: () => void
  start: (id: number) => void
  stop: (id: number) => void
  finish: (id: number) => void
  removeTask: (id: number) => void
}
const task = new Task()
export default defineComponent({
  name: 'popup-index',
  components: {
    MHeader,
    MTable,
    MTaskAdd
  },
  setup() {
    const modalRef = ref<null | { show: () => null }>(null)
    const tableRef = ref<null | HTMLElement>(null)

    const curKey = ref('two')
    const tasks: DataProps = reactive({
      items: task.getAllTaskFromLocal().items,
      refresh: () => {
        const items = tasks.items
        const newItems = task.getAllTaskFromLocal().items
        tasks.items = items.splice(0, items.length, ...newItems)
        tasks.items.length = newItems.length
      },
      start: (id: number) => {
        task.startTask(id)
        tasks.refresh()
      },
      stop: (id: number) => {
        task.stopTask(id)
        tasks.refresh()
      },
      finish: (id: number) => {
        task.finishTask(id)
        tasks.refresh()
      },
      removeTask: (id: number) => {
        task.removeItem(id)
        tasks.refresh()
      }
    })
    const refData = toRefs(tasks)

    const showTask = () => {
      modalRef.value?.show()
    }

    const getTasks = () => {
      console.log(task.getAllTaskFromLocal())
    }

    const listenClick = () => {
      console.log(curKey)
    }

    return {
      modalRef,
      tableRef,
      curKey,
      ...refData,
      showTask,
      getTasks,
      listenClick
    }
  }
})
</script>
