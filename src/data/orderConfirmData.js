import {
  defaultGuaranteeState,
  getGuaranteeItems,
} from './guaranteeData'
import { getPlanDetail, resolvePlanType } from './planDetailData'
import {
  getRecommendation,
  getRouteById,
  getServiceById,
  interactionOptions,
  resolveGuaranteeLabels,
} from './serviceSelectData'
import { GUARANTEE_SELECTION_KEY } from './guaranteeData'
import { SERVICE_SELECTION_KEY } from './serviceSelectData'
import { SELECTED_PLAN_KEY } from './compareData'

export const ORDER_CONFIRM_KEY = 'airmaas_order_confirm'

export const timeCoinConfig = {
  balance: 126,
  useAmount: 20,
  discountYen: 10,
}

export const includedServicesBase = [
  { id: 'ground', label: '前端地面接驳', always: true },
  { id: 'evtol', label: '共享 eVTOL 座位', always: true },
  { id: 'lastmile', label: '目的地末端接驳', always: true },
  { id: 'activity', label: '活动预约 / 权益', always: true },
  { id: 'return', label: '返程安排', always: true },
  { id: 'guarantee', label: '关键时间保障', needGuarantees: true },
  { id: 'service', label: '所选共享服务', always: true },
  { id: 'digital', label: '数字行程管理', always: true },
]

export const adjustRules = [
  {
    title: '低空因天气或空域无法执行',
    action: '优先提供其他班次或地面方案',
  },
  {
    title: '共享班次未能确认',
    action: '推荐相邻时段、其他枢纽或纯地面方案',
  },
  {
    title: '活动临时变化',
    action: '同步调整返程',
  },
  {
    title: '已选择时间保障',
    action: '优先围绕保障目标调整',
  },
  {
    title: '退款与费用差额',
    action: '在调整方案中明确展示',
  },
]

function readJson(key) {
  try {
    return JSON.parse(window.sessionStorage.getItem(key) || 'null')
  } catch {
    return null
  }
}

function normalizeGuaranteePayload(raw) {
  if (!raw) return null
  if (Array.isArray(raw.selectedIds) || raw.guarantees) return raw
  if (raw.guarantees && typeof raw.guarantees === 'object') return raw.guarantees
  return raw
}

export function resolveOrderContext(locationState = {}, searchParams) {
  const fromFlow =
    locationState?.selectedService ||
    locationState?.serviceId ||
    locationState?.serviceTitle
      ? locationState
      : null
  const serviceSelection = fromFlow || readJson(SERVICE_SELECTION_KEY)

  const nestedGuarantees = normalizeGuaranteePayload(
    locationState?.guarantees || serviceSelection?.guarantees,
  )
  const guarantees =
    nestedGuarantees ||
    (Array.isArray(locationState?.selectedIds) ? locationState : null) ||
    readJson(GUARANTEE_SELECTION_KEY)

  const planType = resolvePlanType(
    searchParams?.get?.('type') ||
      locationState?.planType ||
      locationState?.plan?.id ||
      serviceSelection?.planType ||
      readJson(SELECTED_PLAN_KEY)?.id ||
      'time',
  )

  const plan = getPlanDetail(planType)
  const rec = getRecommendation(planType)
  const serviceId =
    serviceSelection?.selectedService || serviceSelection?.serviceId || rec.service
  const routeId =
    serviceSelection?.selectedRoute || serviceSelection?.routeId || rec.route
  const service = getServiceById(serviceId)
  const route = getRouteById(routeId)

  const interactionId =
    serviceSelection?.interactionPreference ||
    locationState?.interactionPreference ||
    'quiet'
  const interactionLabel =
    interactionOptions.find((item) => item.id === interactionId)?.label ||
    '安静同行'

  let enabledMap = { ...defaultGuaranteeState }
  if (guarantees?.guarantees && typeof guarantees.guarantees === 'object') {
    const map = guarantees.guarantees.guarantees || guarantees.guarantees
    if (map && typeof map.arrival === 'boolean') {
      enabledMap = map
    }
  } else if (Array.isArray(guarantees?.selectedIds)) {
    enabledMap = {
      arrival: guarantees.selectedIds.includes('arrival'),
      activityDuration: guarantees.selectedIds.includes('activityDuration'),
      returnHome: guarantees.selectedIds.includes('returnHome'),
    }
  } else if (!guarantees) {
    // 无历史选择时沿用推荐保障，保证演示链路完整
    enabledMap = { ...defaultGuaranteeState }
  }

  const guaranteeItems = getGuaranteeItems(planType)
  const selectedGuaranteeItems = guaranteeItems.filter((item) => enabledMap[item.id])
  const guaranteeFee = selectedGuaranteeItems.reduce((sum, item) => sum + item.fee, 0)
  const serviceFee = service.fee || 0
  const routeFee = route.fee || 0
  const basePrice = plan.price
  const subtotal = basePrice + guaranteeFee + serviceFee + routeFee

  const labels = selectedGuaranteeItems.length
    ? selectedGuaranteeItems.map((item) => item.title)
    : resolveGuaranteeLabels(guarantees)

  return {
    planType,
    plan,
    serviceId: service.id,
    routeId: route.id,
    serviceTitle: serviceSelection?.serviceTitle || service.title,
    routeTitle: serviceSelection?.routeTitle || route.title,
    serviceFee,
    routeFee,
    basePrice,
    guaranteeFee,
    selectedGuaranteeItems,
    guaranteeLabels: labels,
    hasGuarantees: selectedGuaranteeItems.length > 0,
    interactionId,
    interactionLabel,
    subtotal,
    timeline: plan.timeline,
  }
}

export function buildFeeLines(ctx) {
  const lines = [
    { label: '基础周末方案', value: `¥${ctx.basePrice}`, amount: ctx.basePrice },
  ]

  if (ctx.guaranteeFee > 0) {
    lines.push({
      label: '关键时间保障',
      value: `¥${ctx.guaranteeFee}`,
      amount: ctx.guaranteeFee,
    })
  }

  if (ctx.serviceId === 'standard') {
    lines.push({ label: '普通共享', value: '¥0', amount: 0 })
  } else {
    lines.push({
      label: `${ctx.serviceTitle}${ctx.serviceId === 'rush' ? '服务' : ''}`,
      value: `¥${ctx.serviceFee}`,
      amount: ctx.serviceFee,
    })
  }

  lines.push({
    label: ctx.routeTitle,
    value: ctx.routeFee > 0 ? `¥${ctx.routeFee}` : '已包含',
    amount: ctx.routeFee,
  })

  return lines
}

export function getIncludedServices(ctx) {
  return includedServicesBase.filter((item) => {
    if (item.needGuarantees) return ctx.hasGuarantees
    return true
  })
}

export function calcPayable(subtotal, timeCoinEnabled) {
  if (!timeCoinEnabled) return subtotal
  return Math.max(0, subtotal - timeCoinConfig.discountYen)
}
