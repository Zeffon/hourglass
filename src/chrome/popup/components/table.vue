<!--
 * @Description: 
 * @Author: Zeffon
 * @Date: 2021-10-30 21:11:58
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-15 08:04:11
-->
<template>
  <div class="m-table">
    <div class="m-table__item" v-for="(task, index) in tasks" :key="index">
      <div class="m-table__item-index">{{ index + 1 + '.' }}</div>
      <div
        class="m-table__item-name"
        :class="task.status === TASK_STATUS.RUNNING ? 'is-active' : ''"
      >
        {{ task.name }}
      </div>
      <div class="m-table__item-level">
        <m-level
          v-model:level="task.level"
          @change="(level) => changeLevel(task.id, level)"
        />
      </div>
      <div class="m-table__item-time">{{ calcTime(task.time) }}</div>
      <div class="m-table__item-op">
        <div
          class="icon start"
          @click="startTask(task.id)"
          v-if="
            task.status === TASK_STATUS.INIT ||
            task.status === TASK_STATUS.PAUSING
          "
        />
        <div class="icon stop" @click="stopTask(task.id)" v-else />
        <div
          class="icon finish"
          @click="finishTask(task.id)"
          v-if="task.status !== TASK_STATUS.FINISHED"
        />
        <div class="icon delete" @click="deleteTask(task.id)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import MLevel from './level.vue'
import { Task } from '../models'
import { TASK_STATUS } from '../models'
import { secondToDate } from '../utils/time'

const task = new Task()
export default defineComponent({
  name: 'm-table',
  components: {
    MLevel
  },
  data() {
    return {
      TASK_STATUS
    }
  },
  emits: ['start', 'stop', 'finish', 'delete'],
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const dataReactive = reactive({ tasks: props.data })

    const dataRefs = toRefs(dataReactive)

    const changeLevel = (id: number, val: number) => {
      task.modifyLevel(id, val)
    }

    const startTask = (id: number) => {
      emit('start', id)
    }
    const stopTask = (id: number) => {
      emit('stop', id)
    }
    const finishTask = (id: number) => {
      emit('finish', id)
    }

    const deleteTask = (id: number) => {
      emit('delete', id)
    }

    const calcTime = (time: number) => {
      return secondToDate(time)
    }

    return {
      ...dataRefs,
      changeLevel,
      startTask,
      stopTask,
      finishTask,
      deleteTask,
      calcTime
    }
  }
})
</script>
<style lang="scss" scoped>
.icon {
  width: 20px;
  height: 20px;
}
.start {
  background: url('~@/assets/images/start.png') no-repeat;
}
.stop {
  background: url('~@/assets/images/stop.png') no-repeat;
}
.finish {
  background: url('~@/assets/images/finish.png') no-repeat;
}
.delete {
  background: url('~@/assets/images/delete.png') no-repeat;
}
</style>
