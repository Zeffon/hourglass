<template>
  <div class="m-statistics" id="statistics"></div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent } from 'vue'
import { Task } from '../models'
import { curYear, timestampToTime } from '../utils/time'

const task = new Task()
export default defineComponent({
  name: 'm-statistics',
  components: {},
  emits: ['change'],
  props: {},

  mounted() {
    const myChart = (this as any).$echarts.init(
      document.getElementById('statistics')
    )
    // 绘制图表
    myChart.setOption({
      title: {
        top: 0,
        left: 'center',
        text: `${curYear()}年任务完成统计`
      },
      tooltip: {
        position: 'top',
        formatter: function (p: any) {
          var format = timestampToTime(p.data[0])
          return format + '<br/>' + ' 完成 ' + p.data[1] + ' 个任务'
        }
      },
      visualMap: {
        min: 0,
        max: task.calcDayFinishMaxCount(),
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 40,
        inRange: {
          color: ['rgba(0,255,0,0.1)', 'rgba(255,255,0,0.7)', 'rgba(255,0,0,1)']
        }
      },
      calendar: {
        top: 100,
        left: 20,
        right: 10,
        cellSize: ['auto', 13],
        range: curYear(),
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: { show: false }
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.getVirtulData()
      }
    })
  },
  methods: {
    getVirtulData() {
      const finishes = task.calcDayFinishCount()
      const curYear = dayjs().year()
      let start = dayjs(curYear + '-01-01').valueOf()
      let end = dayjs(curYear + 1 + '-01-01').valueOf()
      let dayTime = 3600 * 24 * 1000
      let data: any[] = []
      for (let time = start; time < end; time += dayTime) {
        const date = timestampToTime(time)
        finishes.forEach((item: any) => {
          if (item.date === date) {
            data.push([date, item.count])
          } else {
            data.push([date, 0])
          }
        })
      }
      return data
    }
  }
})
</script>
<style lang="scss" scoped>
.m-statistics {
  height: 200px;
  width: 560px;
}
</style>
