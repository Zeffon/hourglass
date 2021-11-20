/*
 * @Description: 时间工具类
 * @Author: Zeffon
 * @Date: 2021-11-13 22:16:31
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-20 19:29:30
 */
import dayjs from 'dayjs'

export const curTimeStr = () => {
  const curTime = new Date()
  return dayjs(curTime).format('YYYY-MM-DD HH:mm')
}

/**
 * 秒转成时分秒
 */
export const secondToDate = (time: number) => {
  const h = Math.floor(time / 3600)
  const m = Math.floor((time / 60) % 60)
  const s = Math.floor(time % 60)
  const sStr = s < 10 ? '0' + s : s
  if (h === 0) {
    return `${m}:${sStr}`
  }
  return `${h}:${m}:${sStr}`
}

/**
 * 时间戳转换
 * 1637407602990 -> 2021-11-20
 */
export const dateToTime = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD')
}
export const timestampToTime = (timestamp: number) => {
  return dayjs(timestamp).format('YYYY-MM-DD')
}
