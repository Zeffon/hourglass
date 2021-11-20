<template>
  <div class="m-header">
    <div
      class="m-header__item"
      :class="key === TAG_KEY.ONE ? 'is-active' : ''"
      @click="clickOne"
    >
      已完成
    </div>
    <div
      class="m-header__item"
      :class="key === TAG_KEY.TWO ? 'is-active' : ''"
      @click="clickTwo"
    >
      当前（{{ curCount }}）
    </div>
    <div
      class="m-header__item"
      :class="key === TAG_KEY.THREE ? 'is-active' : ''"
      @click="clickThree"
    >
      数据统计
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { ref } from 'vue'
import { TAG_KEY } from '../models'

export default defineComponent({
  name: 'm-header',
  components: {},
  props: {
    curCount: {
      type: Number,
      default: 0
    },
    curKey: {
      type: String,
      default: TAG_KEY.ONE
    }
  },
  data() {
    return {
      TAG_KEY
    }
  },
  emits: ['select'],
  setup(props, { emit }) {
    const key = ref(props.curKey)

    watch(key, (val) => {
      console.log(val)
      emit('select', val)
    })
    const clickOne = () => {
      key.value = TAG_KEY.ONE
    }
    const clickTwo = () => {
      key.value = TAG_KEY.TWO
    }
    const clickThree = () => {
      key.value = TAG_KEY.THREE
    }
    return {
      key,
      clickOne,
      clickTwo,
      clickThree
    }
  }
})
</script>
