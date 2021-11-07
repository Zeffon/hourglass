<!--
 * @Description: 
 * @Author: Zeffon
 * @Date: 2021-10-30 22:48:03
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-10-30 23:11:46
-->
<template>
  <div class="z-select">
    <div
      ref="select_button"
      class="z-select__button"
      @click="selectOpen = !selectOpen"
    ></div>
    <teleport to="body">
      <transition name="select">
        <div
          ref="select_dropdown"
          v-show="selectOpen"
          :style="dropdownStyle"
          class="z-select__dropdown"
        >
          <ul>
            <slot name="selectDropDown"></slot>
          </ul>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'z-select',
  props: {
    selected: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const select_button = ref(null)
    const select_dropdown = ref(null)
    const selectOpen = ref(false)
    const selctValue = ref('')
  }
})
</script>

<style></style>
