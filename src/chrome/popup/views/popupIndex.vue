<!--
 * @Description: popup
 * @Author: Zeffon
 * @Date: 2021-10-09 22:02:36
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-20 13:40:49
-->
<template>
  <div class="g-popup">
    <div class="g-popup-header">
      <MHeader
        v-model:curKey="curKey"
        :curCount="items.length"
        @select="listenClick"
      />
    </div>
    <div class="g-popup-main">
      <FinishTable
        ref="finshTableRef"
        :data="finishItems"
        @restart="restart"
        @delete="removeFinishTask"
        v-show="curKey === TAG_KEY.ONE"
      />
      <MTable
        ref="tableRef"
        :data="items"
        @delete="removeTask"
        @start="start"
        @stop="stop"
        @finish="finish"
        v-show="curKey === TAG_KEY.TWO"
      />
      <MStatistics v-show="curKey === TAG_KEY.THREE" />
    </div>
    <div class="g-popup-footer" v-if="curKey === TAG_KEY.TWO">
      <div class="add-button" @click="showTask">新增</div>
    </div>
    <MTaskAdd ref="modalRef" @ok="refresh"></MTaskAdd>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import {
  MHeader,
  MTable,
  MTaskAdd,
  FinishTable,
  MStatistics
} from '../components'
import { TAG_KEY, Task, TaskModel } from '../models'

interface TableProps {
  items: TaskModel[]
  refresh: () => void
  start: (id: number) => void
  stop: (id: number) => void
  finish: (id: number) => void
  removeTask: (id: number) => void
}
interface FinishProps {
  finishItems: TaskModel[]
  refreshFinish: () => void
  restart: (id: number) => void
  removeFinishTask: (id: number) => void
}
const taskModel = new Task()
export default defineComponent({
  name: 'popup-index',
  components: {
    MHeader,
    MTable,
    MTaskAdd,
    FinishTable,
    MStatistics
  },
  data() {
    return {
      TAG_KEY
    }
  },
  setup() {
    const modalRef = ref<null | { show: () => null }>(null)
    const tableRef = ref<null | HTMLElement>(null)
    const finshTableRef = ref<null | HTMLElement>(null)
    const curKey = ref(TAG_KEY.TWO)
    const hasRunging = ref(taskModel.hasRunning())

    const tasks: TableProps = reactive({
      items: taskModel.getCurrentTask().items,
      refresh: () => {
        const items = tasks.items
        const newItems = taskModel.getCurrentTask().items
        tasks.items = items.splice(0, items.length, ...newItems)
        tasks.items.length = newItems.length
      },
      start: (id: number) => {
        hasRunging.value = true
        taskModel.startTask(id)
        tasks.refresh()
      },
      stop: (id: number) => {
        hasRunging.value = false
        taskModel.stopTask(id)
        tasks.refresh()
      },
      finish: (id: number) => {
        taskModel.finishTask(id)
        tasks.refresh()
      },
      removeTask: (id: number) => {
        taskModel.removeItem(id)
        tasks.refresh()
      }
    })
    const tableRefs = toRefs(tasks)

    const finishTasks: FinishProps = reactive({
      finishItems: taskModel.getCurrentTask().finishItems,
      refreshFinish: () => {
        const items = finishTasks.finishItems
        const newItems = taskModel.getCurrentTask().finishItems
        finishTasks.finishItems = items.splice(0, items.length, ...newItems)
        finishTasks.finishItems.length = newItems.length
      },
      restart: (id: number) => {
        taskModel.restartTask(id)
        finishTasks.refreshFinish()
        tasks.refresh()
      },
      removeFinishTask: (id: number) => {
        taskModel.removeFinishItem(id)
        finishTasks.refreshFinish()
      }
    })
    const finishTableRefs = toRefs(finishTasks)

    const showTask = () => {
      modalRef.value?.show()
    }

    const listenClick = (key: string) => {
      curKey.value = key
    }

    setInterval(() => {
      if (hasRunging.value) {
        taskModel.runTask()
        tasks.refresh()
      }
    }, 1000)

    return {
      modalRef,
      tableRef,
      finshTableRef,
      curKey,
      ...tableRefs,
      ...finishTableRefs,
      showTask,
      listenClick
    }
  }
})
</script>
