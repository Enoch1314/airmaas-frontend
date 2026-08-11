import { getPlanDetail, resolvePlanType } from './planDetailData'
import {
  getRecommendation,
  getRouteById,
  getServiceById,
  resolveGuaranteeLabels,
} from './serviceSelectData'

export const MATCHING_SELECTION_KEY = 'airmaas_matching_state'

export const matchStatusAlias = {
  matching: 'matching',
  formed: 'formed',
  notformed: 'notFormed',
  notFormed: 'notFormed',
  ready: 'ready',
  bookable: 'bookable',
}

export function resolveMatchStatus(raw) {
  if (!raw) return null
  return matchStatusAlias[raw] || null
}

export function getDefaultMatchStatus(planType) {
  if (planType === 'experience') return 'ready'
  if (planType === 'relaxed') return 'bookable'
  return 'matching'
}

export const hubOptions = [
  { id: 'qingpu', label: '青浦汇聚枢纽' },
  { id: 'hongqiao', label: '虹桥低空节点' },
]

export const adjacentSlots = [
  { id: '1345', time: '13:45', note: '可提高匹配成功机会' },
  { id: '1415', time: '14:15', note: '可提高匹配成功机会' },
]

export const companionsMatching = [
  { id: 'me', name: '你', status: 'confirmed', self: true },
  { id: 'a', name: '用户 A', status: 'confirmed' },
  { id: 'b', name: '用户 B', status: 'confirmed' },
  { id: 'wait', name: '等待第 4 位', status: 'waiting' },
]

export const companionsReady = [
  { id: 'me', name: '你', status: 'confirmed', self: true },
  { id: 'a', name: '用户 A', status: 'confirmed' },
  { id: 'b', name: '用户 B', status: 'confirmed' },
  { id: 'c', name: '用户 C', status: 'confirmed' },
]

export const interestTags = ['看展', '青年活动', '城市摄影']

export const experienceTheme = '西岸看展 / 城市艺术'

export const alternatives = [
  {
    id: 'adjacent',
    title: '相邻时段',
    desc: '14:15 班次 · 已有 3 / 4 人',
    action: '切换',
    tone: 'blue',
  },
  {
    id: 'hub',
    title: '其他汇聚枢纽',
    desc: '虹桥节点 · 预计增加12分钟地面接驳',
    action: '查看',
    tone: 'blue',
  },
  {
    id: 'merge',
    title: '合并到已有班次',
    desc: '13:45 已成班 · 预计活动时间减少 8 分钟',
    action: '选择',
    tone: 'green',
  },
  {
    id: 'ground',
    title: '纯地面方案',
    desc: '预计活动时间 3小时28分钟 · 费用 ¥62',
    action: '切换纯地面',
    tone: 'orange',
  },
]

export const formedInfo = {
  title: '共享班次已确认',
  flight: '14:00',
  gatherTime: '13:40',
  gatherPlace: '青浦汇聚枢纽 · B区',
  seats: '4 / 4',
}

export const matchingInfoBase = {
  hub: '青浦汇聚枢纽',
  area: '西岸美术馆片区',
  takeoff: '14:00',
  seatsNeed: 4,
  matched: 3,
  chance: '较高',
  countdownStart: 8 * 60 + 36,
}

export function buildMatchContext({ planType, serviceSelection, guarantees }) {
  const type = resolvePlanType(planType || serviceSelection?.planType)
  const plan = getPlanDetail(type)
  const rec = getRecommendation(type)
  const serviceId = serviceSelection?.selectedService || rec.service
  const routeId = serviceSelection?.selectedRoute || rec.route
  const service = getServiceById(serviceId)
  const route = getRouteById(routeId)
  const guaranteeLabels = resolveGuaranteeLabels(
    guarantees || serviceSelection?.guarantees || serviceSelection,
  )

  return {
    planType: type,
    plan,
    serviceId: service.id,
    routeId: route.id,
    serviceTitle: serviceSelection?.serviceTitle || service.title,
    routeTitle: serviceSelection?.routeTitle || route.title,
    guaranteeLabels,
    totalFee: serviceSelection?.totalFee || plan.price,
    isSameInterest: service.id === 'sameInterest',
  }
}

export function getStatusCopy(status, ctx) {
  if (status === 'matching') {
    return {
      badge: '正在匹配',
      tone: 'blue',
      headline: '3 / 4 人',
      sub: '已匹配',
      tip: '再有 1 位同行者即可满足成班条件',
    }
  }

  if (status === 'formed') {
    return {
      badge: '已满足成班条件',
      tone: 'green',
      headline: '4 / 4 人',
      sub: '共享班次已确认',
      tip: '可确认集合信息并继续',
    }
  }

  if (status === 'ready') {
    return {
      badge: '可确认',
      tone: 'green',
      headline: '4 / 4 人',
      sub: '已满足成班条件',
      tip: '已找到参加相近活动的同行者',
      theme: experienceTheme,
    }
  }

  if (status === 'bookable') {
    return {
      badge: '可预订',
      tone: 'green',
      headline: '当前共享班次已有可用座位',
      sub: `${ctx.serviceTitle} · ${ctx.routeTitle}`,
      tip: '无需继续等待新的拼班用户。',
    }
  }

  return {
    badge: '本时段暂未满足成班条件',
    tone: 'orange',
    headline: '你的周末计划仍然可以继续',
    sub: '请选择替代方案',
    tip: '即使没有成班，周末也不会因此完全中断。',
  }
}

export function formatCountdown(totalSeconds) {
  const safe = Math.max(0, totalSeconds)
  const minutes = String(Math.floor(safe / 60)).padStart(2, '0')
  const seconds = String(safe % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}
