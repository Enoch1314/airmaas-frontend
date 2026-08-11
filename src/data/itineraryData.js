import { getActivityDurationTarget, getGuaranteeItems } from './guaranteeData'
import { resolveBookingSuccessContext } from './bookingSuccessData'
import { resolvePlanType } from './planDetailData'

export const stageAlias = {
  tohub: 'toHub',
  toHub: 'toHub',
  waiting: 'waiting',
  flying: 'flying',
  activity: 'activity',
  returning: 'returning',
}

export function resolveStage(raw) {
  if (!raw) return 'toHub'
  return stageAlias[raw] || 'toHub'
}

export const itineraryCompanions = [
  { id: 'me', name: '你', self: true },
  { id: 'a', name: '用户 A' },
  { id: 'b', name: '用户 B' },
  { id: 'c', name: '用户 C' },
]

export const companionTags = ['看展', '城市摄影', '青年活动']

export const assistantQuestions = [
  {
    id: 'more20',
    q: '我还能多逛20分钟吗？',
    a: '按当前返程保障，再多逛15分钟仍可在21:00前到家；超过后建议同步调整返程。',
  },
  {
    id: 'early',
    q: '现在提前回去可以吗？',
    a: '可以。提前返程后，平台会优先保留你的活动时长结果，并更新数字行程。',
  },
  {
    id: 'rain',
    q: '如果下雨怎么办？',
    a: '若低空受天气影响，会优先推荐其他班次或地面替代方案，并尽量守住你的关键时间。',
  },
  {
    id: 'return',
    q: '帮我调整返程',
    a: '可以进入“调整返程”继续选择更合适的回家安排。',
  },
]

/** 各阶段对应时间轴当前节点索引（按 plan timeline） */
export const stageTimelineIndex = {
  time: {
    toHub: 1,
    waiting: 1,
    flying: 2,
    activity: 5,
    returning: 7,
  },
  experience: {
    toHub: 1,
    waiting: 1,
    flying: 2,
    activity: 5,
    returning: 7,
  },
  relaxed: {
    toHub: 1,
    waiting: 1,
    flying: 2,
    activity: 5,
    returning: 7,
  },
}

export const routeNodesByPlan = {
  time: [
    { id: 'now', label: '当前位置', kind: 'ground' },
    { id: 'metro', label: '地铁', kind: 'ground' },
    { id: 'hub', label: '青浦汇聚枢纽', kind: 'ground' },
    { id: 'air', label: 'eVTOL', kind: 'air' },
    { id: 'west', label: '西岸区域', kind: 'ground' },
    { id: 'museum', label: '美术馆', kind: 'dest' },
  ],
  experience: [
    { id: 'now', label: '当前位置', kind: 'ground' },
    { id: 'metro', label: '地铁', kind: 'ground' },
    { id: 'hub', label: '青浦汇聚枢纽', kind: 'ground' },
    { id: 'air', label: 'eVTOL', kind: 'air' },
    { id: 'west', label: '西岸区域', kind: 'ground' },
    { id: 'museum', label: '美术馆', kind: 'dest' },
  ],
  relaxed: [
    { id: 'now', label: '当前位置', kind: 'ground' },
    { id: 'shuttle', label: '地面接驳', kind: 'ground' },
    { id: 'hub', label: '汇聚枢纽', kind: 'ground' },
    { id: 'air', label: 'eVTOL', kind: 'air' },
    { id: 'west', label: '西岸区域', kind: 'ground' },
    { id: 'museum', label: '美术馆', kind: 'dest' },
  ],
}

/** 路线高亮到第几个节点（含） */
export const stageRouteHighlight = {
  toHub: 1,
  waiting: 2,
  flying: 3,
  activity: 5,
  returning: 5,
}

function buildStageAction(stage, ctx) {
  const flight = ctx.flight
  const activityRemain =
    ctx.planType === 'time'
      ? '3小时42分钟'
      : ctx.planType === 'relaxed'
        ? '2小时58分钟'
        : '3小时12分钟'

  const map = {
    toHub: {
      statusLabel: '行程进行中',
      phaseTitle: '前往汇聚枢纽',
      countdownLabel: '距离下一步还有',
      countdownValue: '14',
      countdownUnit: '分钟',
      title: '前往青浦汇聚枢纽 B 区',
      tips: [`请在 ${flight.gatherTime} 前抵达`, '预计步行 + 地铁 22 分钟'],
      primaryLabel: '开始导航',
      primaryToast: '导航功能为原型演示',
      primaryNav: null,
    },
    waiting: {
      statusLabel: '已抵达 · 等待登乘',
      phaseTitle: '等待登乘',
      countdownLabel: '预计起飞',
      countdownValue: flight.takeoff,
      countdownUnit: '',
      title: '你已抵达汇聚枢纽',
      tips: ['请前往 B 区完成身份核验', `班次 ${flight.takeoff} 起飞`],
      primaryLabel: '查看登乘信息',
      primaryToast: null,
      primaryNav: '/flight-experience?stage=waiting',
    },
    flying: {
      statusLabel: '低空飞行中',
      phaseTitle: '低空飞行中',
      countdownLabel: '预计剩余',
      countdownValue: '12',
      countdownUnit: '分钟',
      title: '正在前往西岸区域',
      tips: [
        ctx.routeTitle,
        ctx.routeId === 'scenic' ? '当前景观节点：黄浦江城市天际线' : '当前航段：快捷衔接中',
      ],
      primaryLabel: '查看舱内体验',
      primaryToast: null,
      primaryNav: '/flight-experience?stage=flying',
    },
    activity: {
      statusLabel: '活动进行中',
      phaseTitle: '活动进行中',
      countdownLabel: '可自由活动',
      countdownValue: activityRemain,
      countdownUnit: '',
      title: '现在，把时间留给生活',
      tips: [`预计 ${ctx.plan.timeline.find((t) => t.title.includes('结束'))?.time || '18:38'} 开始准备返程`],
      primaryLabel: '查看返程安排',
      primaryToast: null,
      primaryNav: '/return-adjust',
      lifeMode: true,
    },
    returning: {
      statusLabel: '返程中',
      phaseTitle: '正在返程',
      countdownLabel: '预计到家',
      countdownValue: ctx.plan.arrivalHome,
      countdownUnit: '',
      title: '正在返程',
      tips: ['关键保障：21:00 前回家', '状态正常'],
      primaryLabel: '查看回家路线',
      primaryToast: '回家路线已展开（原型演示）',
      primaryNav: null,
    },
  }

  return map[stage] || map.toHub
}

export function resolveItineraryContext(locationState, searchParams) {
  const booking = resolveBookingSuccessContext(locationState, searchParams)
  const planType = resolvePlanType(
    searchParams?.get?.('type') || booking.planType,
  )
  const stage = resolveStage(searchParams?.get?.('stage'))
  const activityTarget = getActivityDurationTarget(planType)
  const guaranteeItems = getGuaranteeItems(planType)

  const enabledIds = booking.selectedGuaranteeItems?.map((item) => item.id) || [
    'activityDuration',
    'returnHome',
  ]

  const guarantees = guaranteeItems
    .filter((item) => enabledIds.includes(item.id))
    .map((item) => ({
      id: item.id,
      title: item.title,
      target: item.target,
    }))

  const currentIndex =
    stageTimelineIndex[planType]?.[stage] ?? stageTimelineIndex.time.toHub

  const timeline = booking.plan.timeline.map((item, index) => {
    let state = 'upcoming'
    if (index < currentIndex) state = 'done'
    if (index === currentIndex) state = 'current'
    return { ...item, state, index }
  })

  // toHub: 第一段出发已完成
  if (stage === 'toHub' && timeline[0]) {
    timeline[0] = { ...timeline[0], state: 'done' }
    if (timeline[1]) timeline[1] = { ...timeline[1], state: 'current' }
  }

  const action = buildStageAction(stage, { ...booking, planType })
  const routeNodes = routeNodesByPlan[planType] || routeNodesByPlan.experience
  const highlightTo = stageRouteHighlight[stage] ?? 1

  return {
    ...booking,
    planType,
    stage,
    action,
    timeline,
    currentIndex,
    guarantees,
    activityTarget,
    estimatedActivity: booking.plan.activityTime,
    routeNodes,
    highlightTo,
    nextSegmentLabel:
      stage === 'toHub' || stage === 'waiting'
        ? `共享 eVTOL · ${booking.routeTitle}`
        : stage === 'flying'
          ? '末端接驳至西岸美术馆'
          : stage === 'activity'
            ? '返程安排'
            : '到家衔接',
    nextSegmentTime:
      stage === 'toHub' || stage === 'waiting'
        ? `预计起飞 ${booking.flight.takeoff}`
        : stage === 'flying'
          ? '预计 14:35 抵达附近'
          : stage === 'activity'
            ? `预计 ${booking.plan.arrivalHome} 到家`
            : '行程即将完成',
  }
}
