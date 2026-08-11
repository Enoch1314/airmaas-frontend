import { guaranteeItems } from './guaranteeData'

export const SERVICE_SELECTION_KEY = 'airmaas_selected_service'

export const serviceOptions = [
  {
    id: 'sameInterest',
    title: '同频共飞舱',
    oneLiner: '和参加相同活动或兴趣相近的人一起出发。',
    matchNote: '优先匹配参加相同活动或兴趣相近的同行者',
    suits: ['演出', '展览', '赛事', '青年活动'],
    features: ['共享歌单', '活动期待', '城市推荐'],
    fee: 8,
    tone: 'violet',
  },
  {
    id: 'companion',
    title: '陪伴舱',
    oneLiner: '给带长辈、儿童或需要无障碍支持的同行更多从容。',
    matchNote: '更长换乘缓冲，少换乘，适合家庭与陪伴同行。',
    suits: ['亲子', '带父母', '行动不便同行者'],
    features: ['更长换乘缓冲', '少换乘', '安静模式', '无障碍支持', '家庭同行状态'],
    fee: 12,
    tone: 'teal',
  },
  {
    id: 'rush',
    title: '冲场舱',
    oneLiner: '为演出、赛事、预约展览等强时间要求场景优先保障衔接效率。',
    matchNote: '服务组织和衔接方式更强调时间效率，不突破航空运行规则。',
    suits: ['演唱会', '赛事', '预约展览', '时间敏感活动'],
    features: ['更紧凑的衔接', '优先关注准时到达', '减少不必要等待', '返程时间同步管理'],
    fee: 15,
    tone: 'orange',
  },
]

export const standardService = {
  id: 'standard',
  title: '普通共享',
  subtitle: '不需要特色服务',
  oneLiner: '按时间和方向参与共享班次，不附加社交、陪伴或冲场服务。',
  fee: 0,
}

export const routeOptions = [
  {
    id: 'fast',
    title: '快捷航线',
    oneLiner: '优先减少跨区域绕行和地面拥堵影响，适合时间要求明确的周末安排。',
    features: ['时间效率', '准时衔接', '直接前往目标区域'],
    flightHint: '预计飞行 15 分钟',
    fee: 0,
    tone: 'blue',
  },
  {
    id: 'scenic',
    title: '天空散步航线',
    oneLiner:
      '在满足天气、空域和安全条件的前提下，将城市景观、数字导览和飞行体验融入周末。',
    features: ['城市景观', '数字导览', '放松体验'],
    flightHint: '该航线不一定是最快方案',
    note: '只有用户主动选择，且运行条件满足要求时提供。',
    fee: 20,
    tone: 'violet',
  },
]

export const interactionOptions = [
  { id: 'quiet', label: '安静同行' },
  { id: 'light', label: '轻度交流' },
  { id: 'open', label: '愿意认识同行者' },
]

export const planRecommendations = {
  time: {
    service: 'rush',
    route: 'fast',
    reason: '优先保障活动时间和返程衔接',
    fitLine: '更适合你当前的时间优先方案',
    because: '你希望保留至少4小时活动时间，并在21:00前回家。',
  },
  experience: {
    service: 'sameInterest',
    route: 'scenic',
    reason: '增加城市景观、数字导览和同频体验',
    fitLine: '更适合体验优先方案',
    because: '你希望保留至少3小时45分钟活动时间，并增加城市观景与同行体验。',
  },
  relaxed: {
    service: 'companion',
    route: 'fast',
    reason: '减少换乘并增加衔接缓冲',
    fitLine: '更适合轻松优先方案',
    because: '你希望保留至少3小时30分钟活动时间，并让同行更从容。',
  },
}

export function getRecommendation(planType) {
  return planRecommendations[planType] || planRecommendations.time
}

export function getServiceById(id) {
  if (id === 'standard') return standardService
  return serviceOptions.find((item) => item.id === id) || serviceOptions[0]
}

export function getRouteById(id) {
  return routeOptions.find((item) => item.id === id) || routeOptions[0]
}

export function calcServiceAdjustFee(serviceId, routeId) {
  const serviceFee = getServiceById(serviceId)?.fee || 0
  const routeFee = getRouteById(routeId)?.fee || 0
  return serviceFee + routeFee
}

export function getCompatibilityHint(serviceId, routeId) {
  if (serviceId === 'rush' && routeId === 'scenic') {
    return {
      tone: 'warn',
      text: '你当前有较强时间要求。天空散步航线可能增加行程时间，建议优先选择快捷航线。',
    }
  }
  if (serviceId === 'companion' && routeId === 'scenic') {
    return {
      tone: 'soft',
      text: '已为同行者增加换乘缓冲，请预留更充足的整体时间。',
    }
  }
  return null
}

export function resolveGuaranteeLabels(guarantees) {
  if (!guarantees) return []

  if (Array.isArray(guarantees.selectedIds)) {
    return guaranteeItems
      .filter((item) => guarantees.selectedIds.includes(item.id))
      .map((item) => item.title)
  }

  // P10 可能把整份 P09 payload 嵌在 guarantees 字段里
  if (Array.isArray(guarantees.guarantees?.selectedIds)) {
    return guaranteeItems
      .filter((item) => guarantees.guarantees.selectedIds.includes(item.id))
      .map((item) => item.title)
  }

  if (guarantees.guarantees && typeof guarantees.guarantees === 'object') {
    const map = guarantees.guarantees.guarantees || guarantees.guarantees
    if (map && typeof map === 'object' && !Array.isArray(map)) {
      return guaranteeItems
        .filter((item) => map[item.id])
        .map((item) => item.title)
    }
  }

  return []
}

export function resolveGuaranteeFee(guarantees) {
  if (typeof guarantees?.guaranteeFee === 'number') return guarantees.guaranteeFee

  if (Array.isArray(guarantees?.selectedIds)) {
    return guaranteeItems
      .filter((item) => guarantees.selectedIds.includes(item.id))
      .reduce((sum, item) => sum + item.fee, 0)
  }

  if (guarantees?.guarantees && typeof guarantees.guarantees === 'object') {
    return guaranteeItems
      .filter((item) => guarantees.guarantees[item.id])
      .reduce((sum, item) => sum + item.fee, 0)
  }

  return 0
}

export function getComboCopy(planType, serviceId, routeId) {
  const rec = getRecommendation(planType)
  const service = getServiceById(serviceId)
  const route = getRouteById(routeId)
  const isRecommended = rec.service === serviceId && rec.route === routeId

  if (isRecommended) {
    return {
      fitLine: rec.fitLine,
      because: rec.because,
      recommended: true,
    }
  }

  return {
    fitLine: `你已选择 ${service.title} ＋ ${route.title}`,
    because: rec.because,
    recommended: false,
  }
}
