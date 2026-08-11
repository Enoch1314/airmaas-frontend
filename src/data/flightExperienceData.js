import { resolveBookingSuccessContext } from './bookingSuccessData'
import { interactionOptions } from './serviceSelectData'

export const flightStageAlias = {
  waiting: 'waiting',
  flying: 'flying',
}

export function resolveFlightStage(raw) {
  if (!raw) return 'waiting'
  return flightStageAlias[raw] || 'waiting'
}

export const hubCompanions = [
  { id: 'me', name: '你', status: 'arrived', self: true },
  { id: 'a', name: '用户 A', status: 'arrived' },
  { id: 'b', name: '用户 B', status: 'arrived' },
  { id: 'c', name: '用户 C', status: 'soon', eta: '预计 3 分钟后到达' },
]

export const sameInterestTags = ['看展', '城市摄影', '青年活动']

export const anonymousPeers = [
  { id: 'a', name: '用户A', interest: '城市摄影' },
  { id: 'b', name: '用户B', interest: '艺术展览' },
  { id: 'c', name: '用户C', interest: '周末散步' },
]

export const boardingInfo = {
  seat: '2A',
  gate: 'B2',
  boardAt: '13:58',
  luggage: '随身小件',
  arrivedAt: '13:36',
}

export const boardingNotes = [
  '按现场引导完成登乘',
  '遵守统一安全要求',
  '舱型是服务组织方式，不表示固定物理隔舱',
  '舱型服务不改变航空安全标准',
]

export const scenicNodes = [
  { id: 'skyline', label: '城市天际线' },
  { id: 'river', label: '黄浦江景观' },
  { id: 'west', label: '西岸文化区域' },
]

export const serviceFeatures = {
  rush: {
    features: ['更紧凑衔接', '减少不必要等待', '重点关注准时到达'],
    tone: 'orange',
  },
  sameInterest: {
    features: ['同频活动主题', '城市景观', '数字导览', '可选轻度交流'],
    tone: 'violet',
    theme: '西岸看展 / 城市艺术',
  },
  companion: {
    features: ['更长换乘缓冲', '安静模式', '少换乘', '无障碍支持'],
    tone: 'teal',
  },
  standard: {
    features: ['按时间方向共享', '标准衔接服务'],
    tone: 'blue',
  },
}

export const cabinExperience = {
  sameInterest: {
    type: 'sameInterest',
    playlist: '《周六下午》',
    poll: {
      question: '最想看的展区？',
      options: [
        { label: '当代艺术', percent: 56 },
        { label: '城市设计', percent: 28 },
        { label: '其他', percent: 16 },
      ],
    },
    landscape: '黄浦江城市天际线',
  },
  companion: {
    type: 'companion',
    quietMode: true,
    family: '2人同行',
    accessNote: '目的地已安排少换乘接驳',
    pickupWait: '接驳车辆预计等待 6 分钟',
  },
  rush: {
    type: 'rush',
    target: '14:30 前到达西岸美术馆',
    landAt: '14:15',
    linkStatus: '正常',
    pickup: '预计 5 分钟',
    returnGuard: '21:00 前回家',
  },
}

export const afterLanding = {
  experience: {
    flow: ['目的地低空枢纽', '接驳', '西岸美术馆'],
    eta: '14:35 抵达活动地附近',
  },
  time: {
    flow: ['目的地低空枢纽', '接驳', '西岸美术馆'],
    eta: '14:20 抵达活动地附近',
  },
  relaxed: {
    flow: ['目的地低空枢纽', '西岸美术馆'],
    eta: '14:30 抵达活动地附近',
  },
}

export function resolveFlightExperienceContext(locationState, searchParams) {
  const booking = resolveBookingSuccessContext(locationState, searchParams)
  const stage = resolveFlightStage(searchParams?.get?.('stage'))
  const serviceMeta = serviceFeatures[booking.serviceId] || serviceFeatures.standard
  const cabin = cabinExperience[booking.serviceId] || cabinExperience.rush
  const interactionLabel =
    interactionOptions.find((item) => item.id === booking.interactionId)?.label ||
    '安静同行'
  const landing = afterLanding[booking.planType] || afterLanding.experience

  return {
    ...booking,
    stage,
    serviceMeta,
    cabin,
    interactionLabel,
    landing,
    isScenic: booking.routeId === 'scenic',
    flightMinutes: booking.routeId === 'scenic' ? 23 : 15,
    remainMinutes: 12,
  }
}
