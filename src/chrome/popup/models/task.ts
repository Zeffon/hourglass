/*
 * @Description: 任务模型
 * @Author: Zeffon
 * @Date: 2021-11-09 06:05:22
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-13 15:18:06
 */
import storage from 'good-storage'
import { TASK_STATUS } from '.'

export interface TaskModel {
  id: number
  name: string
  time: number
  level: number
  end_time?: string
  status: number
}

export class Task {
  private static instance: Task
  static STORAGE_KEY = 'task'
  _taskData = {
    items: []
  }

  constructor() {
    if (typeof Task.instance === 'object') {
      return Task.instance
    }
    Task.instance = this
    return this
  }

  getCurrentTask() {
    const tasks = this._getTaskData().items as any[]
    return tasks.filter((item) => {
      return item.status !== TASK_STATUS.FINISHED
    })
  }

  getFinishTask() {
    const tasks = this._getTaskData().items as any[]
    return tasks.filter((item) => {
      return item.status === TASK_STATUS.FINISHED
    })
  }

  getAllTaskFromLocal() {
    return this._getTaskData()
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

  removeItem(id: number) {
    const oldItemIndex = this._findEqualItemIndex(id)
    const taskData = this._getTaskData()
    taskData.items.splice(oldItemIndex, 1)
    this._refreshStorage()
  }

  modifyLevel(id: number, level: number) {
    const oldItem = this._findEqualItem(id)
    oldItem.level = level
    this._refreshStorage()
  }

  finishTask(id: number) {
    this._modifyStatus(id, TASK_STATUS.FINISHED)
  }

  startTask(id: number) {
    const items = this._getTaskData().items
    items.forEach((item: any) => {
      item.status = TASK_STATUS.PAUSING
    })
    this._modifyStatus(id, TASK_STATUS.RUNNING)
  }

  stopTask(id: number) {
    this._modifyStatus(id, TASK_STATUS.PAUSING)
  }

  _modifyStatus(id: number, status: number) {
    const oldItem = this._findEqualItem(id)
    oldItem.status = status
    this._refreshStorage()
  }

  isEmpty() {
    const taskData = this._getTaskData()
    return taskData.items.length === 0
  }

  _findEqualItem(id: number) {
    const taskData = this._getTaskData()
    return taskData.items.find((item: TaskModel) => {
      return item.id === id
    })
  }

  _findEqualItemIndex(id: number) {
    const taskData = this._getTaskData()
    return taskData.items.findIndex((item: TaskModel) => {
      return item.id === id
    })
  }

  _getTaskData() {
    if (this._taskData.items.length !== 0) {
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
      items: []
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
