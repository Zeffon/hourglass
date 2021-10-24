<!--
 * @Description: 
 * @Author: Zeffon
 * @Date: 2021-10-24 22:37:11
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-10-24 23:06:42
-->
<template>
  <div class="tab">
    <router-link
      class="tab-item"
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
    >
      <span class="tab-link">
        {{ tab.name }}
      </span>
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'tab',
  props: {
    curCount: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      tabs: [
        {
          name: '已完成',
          path: '/done'
        },
        {
          name: `当前（0）`,
          path: '/current'
        },
        {
          name: '历史统计',
          path: '/history'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;

  .tab-item {
    flex: 1;
    text-align: center;

    .tab-link {
      padding-bottom: 5px;
      color: $color-text-l;
    }

    &.router-link-active {
      .tab-link {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>
