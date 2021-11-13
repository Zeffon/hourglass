<!--
 * @Description: popup
 * @Author: Zeffon
 * @Date: 2021-10-09 22:02:36
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-13 22:53:11
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
    </div>
    <div class="g-popup-footer" v-if="curKey === TAG_KEY.TWO">
      <div class="add-button" @click="showTask">新增</div>
    </div>
    <MTaskAdd ref="modalRef" @ok="refresh"></MTaskAdd>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { MHeader, MTable, MTaskAdd, FinishTable } from '../components'
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
const task = new Task()
export default defineComponent({
  name: 'popup-index',
  components: {
    MHeader,
    MTable,
    MTaskAdd,
    FinishTable
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

    const tasks: TableProps = reactive({
      items: task.getCurrentTask().items,
      refresh: () => {
        const items = tasks.items
        const newItems = task.getCurrentTask().items
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
    const tableRefs = toRefs(tasks)

    const finishTasks: FinishProps = reactive({
      finishItems: task.getCurrentTask().finishItems,
      refreshFinish: () => {
        const items = finishTasks.finishItems
        const newItems = task.getCurrentTask().finishItems
        finishTasks.finishItems = items.splice(0, items.length, ...newItems)
        finishTasks.finishItems.length = newItems.length
      },
      restart: (id: number) => {
        task.restartTask(id)
        finishTasks.refreshFinish()
        tasks.refresh()
      },
      removeFinishTask: (id: number) => {
        task.removeFinishItem(id)
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
