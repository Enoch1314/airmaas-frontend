import { getActivityDurationTarget } from './guaranteeData'
import { resolveBookingSuccessContext } from './bookingSuccessData'
import { anonymousPeers } from './flightExperienceData'

export const nearbySuggestions = [
  {
    id: 'coffee',
    title: '美术馆咖啡',
    walk: '步行 3 分钟',
    duration: '约 25 分钟',
    impactReturn: false,
  },
  {
    id: 'river',
    title: '滨江散步',
    walk: '步行 5 分钟',
    duration: '约 30 分钟',
    impactReturn: false,
  },
  {
    id: 'dinner',
    title: '附近晚餐',
    walk: '步行 8 分钟',
    duration: '约 45 分钟',
    impactReturn: true,
  },
]

export const activityAssistantQs = [
  {
    id: 'howlong',
    q: '我还能多逛多久？',
    a: '按当前返程安排，你大约还能自由活动3小时12分钟。如果希望21:00前回家，建议在准备返程时间前开始收拾。',
  },
  {
    id: 'nearby',
    q: '附近有什么可以顺便去？',
    a: '可以看看美术馆咖啡、滨江散步或附近晚餐。加入前我会提示是否影响返程保障。',
  },
  {
    id: 'early',
    q: '我想提前回家',
    a: '可以。提前返程后，平台会同步更新数字行程，并尽量保留你已完成的活动时长结果。',
  },
  {
    id: 'return',
    q: '帮我调整返程',
    a: '可以进入“调整返程”继续选择更合适的回家安排。',
  },
]

export const continueOptions = [
  { id: 'together', label: '继续一起逛' },
  { id: 'returnTogether', label: '活动后一起返程' },
  { id: 'end', label: '到这里就好' },
]

const planActivityMeta = {
  time: {
    start: '14:30',
    end: '18:50',
    returnStart: '19:00',
    home: '20:45',
    remainLabel: '3小时42分钟',
    remainMinutes: 222,
    usedMinutes: 38,
    totalActivityMinutes: 260,
    returnReserveMinutes: 115,
    returnPrepIn: '2小时38分钟',
    estimatedActivity: '4小时20分钟',
  },
  experience: {
    start: '14:40',
    end: '18:38',
    returnStart: '18:40',
    home: '20:50',
    remainLabel: '3小时12分钟',
    remainMinutes: 192,
    usedMinutes: 46,
    totalActivityMinutes: 238,
    returnReserveMinutes: 132,
    returnPrepIn: '2小时18分钟',
    estimatedActivity: '3小时58分钟',
  },
  relaxed: {
    start: '14:40',
    end: '18:25',
    returnStart: '18:40',
    home: '20:45',
    remainLabel: '2小时58分钟',
    remainMinutes: 178,
    usedMinutes: 47,
    totalActivityMinutes: 225,
    returnReserveMinutes: 140,
    returnPrepIn: '2小时05分钟',
    estimatedActivity: '3小时45分钟',
  },
}

function addMinutes(time, minutes) {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + minutes
  const hh = String(Math.floor(total / 60) % 24).padStart(2, '0')
  const mm = String(total % 60).padStart(2, '0')
  return `${hh}:${mm}`
}

function toMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function simulateExtend(planType, extendMinutes) {
  const meta = planActivityMeta[planType] || planActivityMeta.experience
  if (!extendMinutes) {
    return {
      extendMinutes: 0,
      end: meta.end,
      returnStart: meta.returnStart,
      home: meta.home,
      warning: '',
      okMessage: '',
      canMeetReturn: true,
    }
  }

  const newEnd = addMinutes(meta.end, extendMinutes)
  const newReturnStart = addMinutes(meta.returnStart, extendMinutes)
  const newHome = addMinutes(meta.home, extendMinutes)
  const canMeet = toMinutes(newHome) <= toMinutes('21:00')

  // 时间优先：多逛20分钟仍可 mock 找到替代返程
  if (planType === 'time' && extendMinutes === 20) {
    return {
      extendMinutes,
      end: newEnd,
      returnStart: newReturnStart,
      home: '20:58',
      warning: '',
      okMessage: '已找到新的返程方案，仍可在21:00前到家。',
      canMeetReturn: true,
    }
  }

  if (!canMeet) {
    return {
      extendMinutes,
      end: newEnd,
      returnStart: newReturnStart,
      home: newHome,
      warning: `延长${extendMinutes}分钟后，可能无法满足21:00前返程保障。`,
      okMessage: '',
      canMeetReturn: false,
    }
  }

  return {
    extendMinutes,
    end: newEnd,
    returnStart: newReturnStart,
    home: newHome,
    warning: '',
    okMessage: '当前延长仍可满足返程保障。',
    canMeetReturn: true,
  }
}

export function resolveActivityContext(locationState, searchParams) {
  const booking = resolveBookingSuccessContext(locationState, searchParams)
  const meta = planActivityMeta[booking.planType] || planActivityMeta.experience
  const activityTarget = getActivityDurationTarget(booking.planType)
  const usedRatio = meta.usedMinutes / (meta.usedMinutes + meta.remainMinutes + meta.returnReserveMinutes)
  const remainRatio = meta.remainMinutes / (meta.usedMinutes + meta.remainMinutes + meta.returnReserveMinutes)
  const returnRatio = 1 - usedRatio - remainRatio

  return {
    ...booking,
    meta,
    activityTarget,
    peers: anonymousPeers,
    progress: {
      used: Math.round(usedRatio * 100),
      remain: Math.round(remainRatio * 100),
      returning: Math.round(returnRatio * 100),
    },
  }
}
