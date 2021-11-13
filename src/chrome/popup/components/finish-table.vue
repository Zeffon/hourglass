<!--
 * @Description: 
 * @Author: Zeffon
 * @Date: 2021-10-30 21:11:58
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-13 22:12:22
-->
<template>
  <div class="m-table">
    <div class="m-table__item" v-for="(task, index) in tasks" :key="index">
      <div class="m-table__item-index">{{ index + 1 + '.' }}</div>
      <div class="m-table__item-name">{{ task.name }}</div>
      <div class="m-table__item-level">
        <m-level
          v-model:level="task.level"
          @change="(level) => changeLevel(task.id, level)"
        />
      </div>
      <div class="m-table__item-time">{{ task.time }}min</div>
      <div class="m-table__item-times">{{ task.end_time }}</div>
      <div class="m-table__item-op">
        <div class="icon start" @click="restartTask(task.id)" />
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

const task = new Task()
export default defineComponent({
  name: 'finish-table',
  components: {
    MLevel
  },
  data() {
    return {
      TASK_STATUS
    }
  },
  emits: ['restart', 'delete'],
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
      task.modifyFinishLevel(id, val)
    }

    const restartTask = (id: number) => {
      emit('restart', id)
    }
    const deleteTask = (id: number) => {
      emit('delete', id)
    }

    return {
      ...dataRefs,
      changeLevel,
      restartTask,
      deleteTask
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
