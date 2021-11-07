/*
 * @Description: 缓存数组操作
 * @Author: Zeffon
 * @Date: 2021-11-07 10:26:21
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-07 11:55:18
 */
import storage from 'good-storage'

function inertArray(arr: unknown[], val: any, compare: any, maxLen: number) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr: unknown[], compare: any) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function save(item: any, key: string, compare: any, maxLen: number) {
  const items = storage.get(key, [])
  inertArray(items, item, compare, maxLen)
  storage.set(key, items)
  return items
}

export function remove(key: string, compare: any) {
  const items = storage.get(key, [])
  deleteFromArray(items, compare)
  storage.set(key, items)
  return items
}

export function load(key: string) {
  return storage.get(key, [])
}

export function clear(key: string) {
  storage.remove(key)
  return []
}

export function saveAll(items: unknown[], key: string) {
  storage.set(key, items)
}
