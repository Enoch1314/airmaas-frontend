import { ORDER_CONFIRM_KEY, resolveOrderContext } from './orderConfirmData'

export const nextStepMock = {
  gatherBefore: '13:40',
  place: '青浦汇聚枢纽 B 区',
  remainLabel: '2小时12分钟',
}

export const flightConfirmByPlan = {
  time: {
    gatherTime: '13:40',
    takeoff: '14:00',
    place: '青浦汇聚枢纽 · B区',
    seats: '4 / 4',
    depart: '13:10',
    arrive: '14:20',
  },
  experience: {
    gatherTime: '13:40',
    takeoff: '14:05',
    place: '青浦汇聚枢纽 · B区',
    seats: '4 / 4',
    depart: '13:00',
    arrive: '14:35',
  },
  relaxed: {
    gatherTime: '13:35',
    takeoff: '14:00',
    place: '青浦汇聚枢纽 · B区',
    seats: '4 / 4',
    depart: '13:00',
    arrive: '14:30',
  },
}

export const quickActions = [
  { id: 'calendar', label: '添加到日历', toast: '已添加到日历（原型演示）' },
  { id: 'share', label: '分享给同行人', toast: '已生成同行分享卡（原型演示）' },
  { id: 'remind', label: '开启行程提醒', toast: '行程提醒已开启' },
]

function readOrderPayload() {
  try {
    return JSON.parse(window.sessionStorage.getItem(ORDER_CONFIRM_KEY) || 'null')
  } catch {
    return null
  }
}

export function resolveBookingSuccessContext(locationState = {}, searchParams) {
  const stored = readOrderPayload()
  const merged = {
    ...(stored || {}),
    ...(locationState || {}),
  }

  const ctx = resolveOrderContext(merged, searchParams)
  const flight = flightConfirmByPlan[ctx.planType] || flightConfirmByPlan.time

  const guaranteeLines = ctx.selectedGuaranteeItems.map((item) => {
    if (item.id === 'activityDuration') return item.target
    if (item.id === 'returnHome') return '21:00 前回家'
    if (item.id === 'arrival') return '14:30 前到达'
    return item.target
  })

  return {
    ...ctx,
    flight,
    guaranteeLines,
    payable: typeof merged.payable === 'number' ? merged.payable : ctx.subtotal,
    timeCoinEnabled: Boolean(merged.timeCoinEnabled),
  }
}
