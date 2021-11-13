/*
 * @Description: 时间工具类
 * @Author: Zeffon
 * @Date: 2021-11-13 22:16:31
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-11-13 22:33:08
 */
import dayjs from 'dayjs'

export const curTimeStr = () => {
  const curTime = new Date()
  return dayjs(curTime).format('YYYY-MM-DD HH:mm')
}
