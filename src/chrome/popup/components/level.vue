<template>
  <div class="m-level">
    <select v-model="selectName" :class="selectCls">
      <option
        v-for="(item, index) in options"
        :key="index"
        selected
        :class="`option-${index}`"
      >
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'm-level',
  components: {},
  emits: ['change'],
  props: {
    level: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const options = ref(['一般', '重要', '紧急'])
    const level = options.value[props.level]
    const selectName = ref(level)
    const selectCls = ref('select-' + props.level)

    watch(selectName, (val) => {
      selectCls.value = 'select-' + options.value.indexOf(val)
      selectName.value = val
      emit('change', val)
    })

    return {
      selectName,
      options,
      selectCls
    }
  }
})
</script>
<style lang="scss" scoped>
.select-0,
.option-0 {
  color: $info-color;
  border-color: $info-color;
  border-radius: 4px;
}
.select-1,
.option-1 {
  color: $primary-color;
  border-color: $primary-color;
  border-radius: 4px;
}
.select-2,
.option-2 {
  color: $danger-color;
  border-color: $danger-color;
  border-radius: 4px;
}
</style>
