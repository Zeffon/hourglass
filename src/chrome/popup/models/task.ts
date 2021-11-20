/*
 * @Description: 任务模型
 * @Author: Zeffon
 * @Date: 2021-11-09 06:05:22
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-20 19:39:25
 */
import storage from 'good-storage'
import { TASK_STATUS } from '.'
import { curTimeStr, dateToTime } from '../utils/time'

export interface TaskModel {
  id: number
  name: string
  time: number
  level: number
  start_time?: number
  end_time?: string
  status: number
}

export class Task {
  private static instance: Task
  static STORAGE_KEY = 'task'
  _taskData = {
    items: [],
    finishItems: []
  }

  constructor() {
    if (typeof Task.instance === 'object') {
      return Task.instance
    }
    Task.instance = this
    return this
  }

  getCurrentTask() {
    return this._getTaskData()
  }

  calcDayFinishCount() {
    const array = this._getTaskData().finishItems

    const list = array.reduce((obj: any, item: any) => {
      const date = dateToTime(item.end_time)
      const find = obj.find((o: any) => dateToTime(o.end_time) === date)
      const _d = { date, count: 1 }
      find ? find.count++ : obj.push(_d)
      return obj
    }, [])
    return list
  }

  calcDayFinishMaxCount() {
    const list = this.calcDayFinishCount()
    const maxCount = list.reduce((pre: any, cur: any) =>
      pre.count < cur.count ? cur : pre
    ).count
    return maxCount
  }

  clear() {
    const taskData = this._getTaskData()
    for (let i = 0; i < taskData.items.length; i++) {
      if (taskData.items[i].checked) {
        taskData.items.splice(i, 1)
      }
    }
    this._refreshStorage()
  }

  addItem(newItem: TaskModel) {
    this._pushItem(newItem)
    this._refreshStorage()
  }

  addFinishItem(newItem: TaskModel) {
    this._pushFinishItem(newItem)
    this._refreshStorage()
  }

  removeItem(id: number) {
    const oldItemIndex = this._findEqualItemIndex(id)
    const taskData = this._getTaskData()
    taskData.items.splice(oldItemIndex, 1)
    this._refreshStorage()
  }

  removeFinishItem(id: number) {
    const oldItemIndex = this._findEqualFinishItemIndex(id)
    const taskData = this._getTaskData()
    taskData.finishItems.splice(oldItemIndex, 1)
    this._refreshStorage()
  }

  modifyLevel(id: number, level: number) {
    const oldItem = this._findEqualItem(id)
    oldItem.level = level
    this._refreshStorage()
  }

  modifyFinishLevel(id: number, level: number) {
    const oldItem = this._findEqualFinishItem(id)
    oldItem.level = level
    this._refreshStorage()
  }

  finishTask(id: number) {
    const item = this._findEqualItem(id)
    item.status = TASK_STATUS.FINISHED
    item.end_time = curTimeStr()
    this.addFinishItem(item)
    this.removeItem(id)
    this._refreshStorage()
  }

  startTask(id: number) {
    const items = this._getTaskData().items
    items.forEach((item: any) => {
      item.status = TASK_STATUS.PAUSING
    })
    const oldItem = this._findEqualItem(id)
    oldItem.status = TASK_STATUS.RUNNING
    oldItem.start_time = new Date().getTime()
    this._refreshStorage()
  }

  runTask() {
    const items = this._getTaskData().items
    const runItem = items.find(
      (item: any) => item.status === TASK_STATUS.RUNNING
    )
    if (runItem !== undefined) {
      const curTime = new Date().getTime()
      const diffTime = (curTime - runItem.start_time) / 1000
      runItem.time = runItem.time + Math.round(diffTime)
      runItem.start_time = curTime
      this._refreshStorage()
    }
  }

  restartTask(id: number) {
    const item = this._findEqualFinishItem(id)
    item.status = TASK_STATUS.INIT
    this._pushItem(item)
    this.removeFinishItem(id)
    this._refreshStorage()
  }

  stopTask(id: number) {
    this._modifyStatus(id, TASK_STATUS.PAUSING)
  }

  isEmpty() {
    const taskData = this._getTaskData()
    return taskData.items.length === 0
  }

  hasRunning() {
    const items = this._getTaskData().items
    let running = false
    items.forEach((item: any) => {
      if (item.status === TASK_STATUS.RUNNING) {
        running = true
      }
    })
    return running
  }

  _findEqualItem(id: number) {
    const taskData = this._getTaskData()
    return taskData.items.find((item: TaskModel) => {
      return item.id === id
    })
  }

  _findEqualFinishItem(id: number) {
    const taskData = this._getTaskData()
    return taskData.finishItems.find((item: TaskModel) => {
      return item.id === id
    })
  }

  _findEqualItemIndex(id: number) {
    const taskData = this._getTaskData()
    return taskData.items.findIndex((item: TaskModel) => {
      return item.id === id
    })
  }

  _findEqualFinishItemIndex(id: number) {
    const taskData = this._getTaskData()
    return taskData.finishItems.findIndex((item: TaskModel) => {
      return item.id === id
    })
  }

  _getTaskData() {
    if (
      this._taskData.items.length !== 0 ||
      this._taskData.finishItems.length !== 0
    ) {
      return this._taskData
    }
    let taskData = storage.get(Task.STORAGE_KEY)
    if (!taskData) {
      taskData = this._initTaskDataStorage()
    }
    this._taskData = taskData
    return taskData
  }

  _initTaskDataStorage() {
    const taskData = {
      items: [],
      finishItems: []
    }
    storage.set(Task.STORAGE_KEY, taskData)
    return taskData
  }

  _refreshStorage() {
    storage.set(Task.STORAGE_KEY, this._taskData)
  }

  _pushItem(newItem: TaskModel) {
    const taskData = this._getTaskData()
    const items = taskData.items
    items.push(newItem)
  }

  _pushFinishItem(newItem: TaskModel) {
    const taskData = this._getTaskData()
    const items = taskData.finishItems
    items.unshift(newItem)
  }

  _modifyStatus(id: number, status: number) {
    const oldItem = this._findEqualItem(id)
    oldItem.status = status
    this._refreshStorage()
  }

  findEqualItem(id: number) {
    let oldItem = null
    const items = this._getTaskData().items
    for (let i = 0; i < items.length; i++) {
      if (this._isEqualItem(items[i], id)) {
        oldItem = items[i]
        break
      }
    }
    return oldItem
  }

  _isEqualItem(oldItem: TaskModel, id: number) {
    return oldItem.id === id
  }
}
