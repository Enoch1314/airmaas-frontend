import { getActivityDurationTarget } from './guaranteeData'
import { resolveActivityContext } from './activityData'

export const returnAssistantQs = [
  {
    id: 'late',
    q: '我还能晚多久？',
    a: '若希望守住21:00前到家，建议优先查看“相邻共享班次”或“快速地面方案”。直接延后共享低空可能到家超过21:00。',
  },
  {
    id: 'before21',
    q: '有没有21:00前到家的方案？',
    a: '有。提前返回、原计划、快速地面和相邻共享班次都可以满足21:00前返程保障。',
  },
  {
    id: 'ground',
    q: '我想直接坐地面回去',
    a: '可以切换纯地面返程。预计约20:58到家，仍可满足返程保障，低空并不是必须使用。',
  },
  {
    id: 'more',
    q: '帮我保留更多活动时间',
    a: '若想多留20分钟，建议选择快速地面或相邻共享班次，这样仍有机会在21:00前到家。',
  },
]

const planReturnBase = {
  time: {
    end: '18:50',
    returnStart: '19:00',
    home: '20:45',
    remainLabel: '3小时42分钟',
    estimatedActivity: '4小时20分钟',
    early: { depart: '18:30', home: '20:25', activityDelta: -20 },
    delay: { depart: '19:20', home: '21:05', activityDelta: 20 },
    groundFast: { depart: '19:20', home: '20:58', fee: 18 },
    adjacent: { depart: '19:15', home: '20:55', fee: 0 },
    groundPure: { depart: '19:05', home: '20:58', fee: 48, transfers: 2 },
  },
  experience: {
    end: '18:38',
    returnStart: '18:40',
    home: '20:50',
    remainLabel: '3小时12分钟',
    estimatedActivity: '3小时58分钟',
    early: { depart: '18:20', home: '20:30', activityDelta: -20 },
    delay: { depart: '19:00', home: '21:10', activityDelta: 20 },
    groundFast: { depart: '19:00', home: '20:58', fee: 18 },
    adjacent: { depart: '18:55', home: '20:55', fee: 0 },
    groundPure: { depart: '18:45', home: '20:58', fee: 48, transfers: 2 },
  },
  relaxed: {
    end: '18:25',
    returnStart: '18:40',
    home: '20:45',
    remainLabel: '2小时58分钟',
    estimatedActivity: '3小时45分钟',
    early: { depart: '18:10', home: '20:25', activityDelta: -20 },
    delay: { depart: '19:00', home: '21:10', activityDelta: 20 },
    groundFast: { depart: '19:00', home: '20:58', fee: 18 },
    adjacent: { depart: '18:55', home: '20:55', fee: 0 },
    groundPure: { depart: '18:35', home: '20:58', fee: 48, transfers: 2 },
  },
}

function meetsReturn(home) {
  const [h, m] = home.split(':').map(Number)
  return h * 60 + m <= 21 * 60
}

export function buildReturnOptions(planType) {
  const base = planReturnBase[planType] || planReturnBase.experience

  return {
    base,
    options: [
      {
        id: 'early',
        title: '提前一点回家',
        depart: base.early.depart,
        home: base.early.home,
        activityDelta: base.early.activityDelta,
        activityDeltaLabel: '比原计划少 20 分钟活动时间',
        features: ['少等待', '更稳妥', '返程保障余量更充足'],
        feeDelta: 0,
        mode: 'shared',
        meets: meetsReturn(base.early.home),
        recommended: false,
      },
      {
        id: 'original',
        title: '按原计划返回',
        depart: base.returnStart,
        home: base.home,
        activityDelta: 0,
        activityDeltaLabel: '保持原计划',
        features: ['活动时间不变', '共享低空返程'],
        feeDelta: 0,
        mode: 'shared',
        meets: meetsReturn(base.home),
        recommended: true,
      },
      {
        id: 'delay',
        title: '多留 20 分钟',
        depart: base.delay.depart,
        home: base.delay.home,
        activityDelta: base.delay.activityDelta,
        activityDeltaLabel: '+20分钟活动时间',
        features: ['多留一点周末时间'],
        feeDelta: 0,
        mode: 'shared',
        meets: meetsReturn(base.delay.home),
        recommended: false,
        warn: true,
      },
    ],
    alternatives: [
      {
        id: 'groundFast',
        title: '快速地面方案',
        depart: base.groundFast.depart,
        home: base.groundFast.home,
        feeDelta: base.groundFast.fee,
        activityDelta: 20,
        activityDeltaLabel: '多留 20 分钟活动时间',
        meets: true,
        note: '仍可满足21:00前返程',
      },
      {
        id: 'adjacent',
        title: '相邻共享班次',
        depart: base.adjacent.depart,
        home: base.adjacent.home,
        feeDelta: base.adjacent.fee,
        activityDelta: 15,
        activityDeltaLabel: '接近多留一刻钟',
        meets: true,
        note: '满足返程保障',
      },
      {
        id: 'delayKeep',
        title: '继续使用原共享方案',
        depart: base.delay.depart,
        home: base.delay.home,
        feeDelta: 0,
        activityDelta: 20,
        activityDeltaLabel: '+20分钟活动时间',
        meets: false,
        note: '无法满足21:00前返程保障',
      },
    ],
    groundPure: {
      id: 'groundPure',
      title: '切换纯地面返程',
      depart: base.groundPure.depart,
      home: base.groundPure.home,
      feeDelta: base.groundPure.fee,
      transfers: base.groundPure.transfers,
      activityDelta: 0,
      activityDeltaLabel: '活动时间接近原计划',
      meets: true,
      note: '低空并不是必须使用，只要地面方案更适合当前时间要求，AirMaaS 同样会推荐。',
    },
  }
}

export function resolveSelectedPlan(selectionId, pack) {
  if (!selectionId) return null
  if (selectionId === 'groundPure') return pack.groundPure
  const fromMain = pack.options.find((item) => item.id === selectionId)
  if (fromMain) return fromMain
  return pack.alternatives.find((item) => item.id === selectionId) || null
}

export function getActivityEstimate(baseEstimate, delta) {
  if (!delta) return baseEstimate
  // 简单展示：在原预计文案后附加变化，避免复杂解析
  if (delta > 0) return `${baseEstimate}（+${delta}分钟）`
  return `${baseEstimate}（${delta}分钟）`
}

export function resolveReturnAdjustContext(locationState, searchParams) {
  const activity = resolveActivityContext(locationState, searchParams)
  const pack = buildReturnOptions(activity.planType)
  const activityTarget = getActivityDurationTarget(activity.planType)
  const extendRaw = searchParams?.get?.('extend')
  const extend = extendRaw ? Number(extendRaw) : 0

  return {
    ...activity,
    pack,
    activityTarget,
    extend,
    defaultSelection: extend >= 20 ? 'delay' : 'original',
  }
}
