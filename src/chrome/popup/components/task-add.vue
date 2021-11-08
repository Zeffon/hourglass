<!--
 * @Description: 任务新增弹框
 * @Author: Zeffon
 * @Date: 2021-11-07 23:02:10
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-08 09:19:06
-->
<template>
  <teleport to="body">
    <transition name="slide-down">
      <div class="task-add" v-show="visible">
        <div class="content">
          <textarea
            name="textarea"
            class="content__comments"
            rows="2"
            cols="48"
            placeholder="请输入任务，多个使用换行"
            v-model="textdata"
          />
          <div class="err-tip">{{ errTip }}</div>
        </div>

        <div class="task-add__footer">
          <div class="task-add__footer-button">
            <div class="task-add__footer-button--cancel" @click="cancel">
              取消
            </div>
            <div class="task-add__footer-button--confirm" @click="ok">确认</div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'task-add',
  props: {},
  data() {
    return {
      visible: false,
      textdata: '',
      errTip: ''
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    cancel() {
      this.textdata = ''
      this.errTip = ''
      this.hide()
    },
    ok() {
      this._dataCheck()
    },
    _dataCheck() {
      const textdata = this.textdata
      if (textdata === '') {
        this.errTip = '请输入任务'
        return false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.task-add {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 360px;
  height: 154px;
  padding: 10px;
  box-sizing: border-box;
  z-index: 400;
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
  opacity: 1;
  border-radius: 4px;
  margin: auto;

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80%;
    &__comments {
      width: 340px !important;
      height: 90px !important;
      box-sizing: border-box;
    }
    .err-tip {
      font-size: $font-size-small;
      color: $danger-color;
    }
  }

  &__footer {
    position: absolute;
    width: 94%;
    height: 36px;
    line-height: 2;
    bottom: 0;

    &-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      > div {
        width: 40px;
        height: 20px;
        color: #fff;
        text-align: center;
        line-height: 1.5;
        border-radius: 4px;
        cursor: pointer;
        margin: 0 8px;
      }

      &--cancel {
        background: gray;
        border: 1px solid gray;
      }
      &--confirm {
        background: $primary-color;
        border: 1px solid $primary-color;
      }
    }
  }
}
</style>
