export const GUARANTEE_SELECTION_KEY = 'airmaas_selected_guarantees'

export const activityDurationByPlan = {
  time: {
    target: '至少保留 4 小时活动时间',
    goalLabel: '至少 240 分钟',
    short: '至少保留 4 小时活动时间',
    minutes: 240,
  },
  experience: {
    target: '至少保留 3小时45分钟活动时间',
    goalLabel: '至少 225 分钟',
    short: '至少保留 3小时45分钟活动时间',
    minutes: 225,
  },
  relaxed: {
    target: '至少保留 3小时30分钟活动时间',
    goalLabel: '至少 210 分钟',
    short: '至少保留 3小时30分钟活动时间',
    minutes: 210,
  },
}

export const guaranteeItemsBase = [
  {
    id: 'arrival',
    title: '到达保障',
    target: '14:30 前到达西岸美术馆',
    goalLabel: '14:30 前抵达',
    desc: '适合展览预约、演出、赛事等有明确开始时间的活动。',
    fee: 12,
    failNote: '若平台原因未完成：按规则提供时间币补偿或调整后续方案',
    tone: 'blue',
  },
  {
    id: 'activityDuration',
    title: '活动时长保障',
    target: '至少保留 4 小时活动时间',
    goalLabel: '至少 240 分钟',
    desc: '即使前端交通发生变化，平台也会优先调整后续交通和返程，尽量保留约定的活动时间。',
    fee: 16,
    failNote: '未完成时：按规则提供时间币补偿',
    tone: 'orange',
  },
  {
    id: 'returnHome',
    title: '返程保障',
    target: '21:00 前回到家',
    goalLabel: '21:00 前到家',
    desc: '适合第二天有工作、需要照顾家人或有明确返程要求的用户。',
    fee: 10,
    failNote: '若原低空方案无法满足：优先调整班次或切换可执行的地面方案',
    tone: 'green',
  },
]

/** @deprecated 使用 getGuaranteeItems(planType)；保留兼容旧引用 */
export const guaranteeItems = guaranteeItemsBase

export const recommendGuaranteeIds = ['activityDuration', 'returnHome']

export const defaultGuaranteeState = {
  arrival: false,
  activityDuration: true,
  returnHome: true,
}

export function getActivityDurationTarget(planType = 'time') {
  return activityDurationByPlan[planType] || activityDurationByPlan.time
}

export function getGuaranteeItems(planType = 'time') {
  const activity = getActivityDurationTarget(planType)
  return guaranteeItemsBase.map((item) => {
    if (item.id !== 'activityDuration') return item
    return {
      ...item,
      target: activity.target,
      goalLabel: activity.goalLabel,
    }
  })
}
