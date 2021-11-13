/*
 * @Description: 时间工具类
 * @Author: Zeffon
 * @Date: 2021-11-13 22:16:31
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-13 23:16:09
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
  if (h === 0) {
    return `${m}min ${s}s`
  }
  return `${h}h${m}min ${s}s`
}
