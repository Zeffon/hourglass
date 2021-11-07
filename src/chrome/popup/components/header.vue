<template>
  <div class="m-header">
    <div
      class="m-header__item"
      :class="key === 'one' ? 'is-active' : ''"
      @click="clickOne"
    >
      已完成
    </div>
    <div
      class="m-header__item"
      :class="key === 'two' ? 'is-active' : ''"
      @click="clickTwo"
    >
      当前（{{ curCount }}）
    </div>
    <div
      class="m-header__item"
      :class="key === 'three' ? 'is-active' : ''"
      @click="clickThree"
    >
      数据统计
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'

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
      default: 'three'
    }
  },
  setup(props) {
    const key = ref(props.curKey)
    return {
      key
    }
  },
  methods: {
    clickOne() {
      this.key = 'one'
    },
    clickTwo() {
      this.key = 'two'
    },
    clickThree() {
      this.key = 'three'
    }
  }
})
</script>
