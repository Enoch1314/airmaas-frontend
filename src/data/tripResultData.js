import { getActivityDurationTarget } from './guaranteeData'
import { resolveBookingSuccessContext } from './bookingSuccessData'
import { getPlanDetail } from './planDetailData'

export const FINAL_ADJUSTMENT_KEY = 'finalAdjustmentChoice'
export const TRIP_ADJUST_SESSION_KEY = 'airmaas_trip_adjust'

export const feedbackTags = [
  { id: 'easy', label: '轻松' },
  { id: 'pace', label: '节奏合适' },
  { id: 'clear', label: '安排清楚' },
  { id: 'again', label: '愿意再次使用' },
]

const CHOICE_OUTCOMES = {
  keepOriginal: {
    id: 'keepOriginal',
    activityName: '西岸美术馆',
    actualLifeMinutes: 216,
    actualLifeLabel: '3小时36分钟',
    homeTime: '20:55',
    arriveTime: '15:02',
    recoveredMinutes: 8,
    executionLabel: '快速地面前往原活动',
    routeNodes: ['青浦', '地面接驳', '原活动', '返程'],
    meetsActivity: false,
    shortfallMinutes: 9,
  },
  altActivity: {
    id: 'altActivity',
    activityName: '西岸艺术中心特别展',
    actualLifeMinutes: 235,
    actualLifeLabel: '3小时55分钟',
    homeTime: '20:45',
    arriveTime: '14:48',
    recoveredMinutes: 27,
    executionLabel: '替代室内活动路线',
    routeNodes: ['青浦', '地面接驳', '替代活动', '返程'],
    meetsActivity: true,
    shortfallMinutes: 0,
  },
  rainRoute: {
    id: 'rainRoute',
    activityName: '雨天城市体验',
    actualLifeMinutes: 245,
    actualLifeLabel: '4小时05分钟',
    homeTime: '20:40',
    arriveTime: '14:40',
    recoveredMinutes: 37,
    executionLabel: '雨天城市路线',
    routeNodes: ['青浦', '地面接驳', '雨天体验', '返程'],
    meetsActivity: true,
    shortfallMinutes: 0,
  },
  adjacent: {
    id: 'adjacent',
    activityName: '西岸美术馆',
    actualLifeMinutes: 228,
    actualLifeLabel: '3小时48分钟',
    homeTime: '20:50',
    arriveTime: '14:50',
    recoveredMinutes: 20,
    executionLabel: '相邻时段共享班次',
    routeNodes: ['青浦', '共享低空', '活动', '返程'],
    meetsActivity: true,
    shortfallMinutes: 0,
    usedAir: true,
  },
  otherHub: {
    id: 'otherHub',
    activityName: '西岸美术馆',
    actualLifeMinutes: 222,
    actualLifeLabel: '3小时42分钟',
    homeTime: '20:52',
    arriveTime: '14:55',
    recoveredMinutes: 14,
    executionLabel: '其他汇聚枢纽衔接',
    routeNodes: ['其他枢纽', '共享低空', '活动', '返程'],
    meetsActivity: true,
    shortfallMinutes: 0,
    usedAir: true,
  },
  existing: {
    id: 'existing',
    activityName: '西岸美术馆',
    actualLifeMinutes: 230,
    actualLifeLabel: '3小时50分钟',
    homeTime: '20:45',
    arriveTime: '14:28',
    recoveredMinutes: 22,
    executionLabel: '已有班次合并',
    routeNodes: ['青浦', '共享低空', '活动', '返程'],
    meetsActivity: true,
    shortfallMinutes: 0,
    usedAir: true,
  },
  ground: {
    id: 'ground',
    activityName: '西岸美术馆',
    actualLifeMinutes: 208,
    actualLifeLabel: '3小时28分钟',
    homeTime: '20:58',
    arriveTime: '15:05',
    recoveredMinutes: 0,
    executionLabel: '纯地面方案',
    routeNodes: ['青浦', '地面接驳', '活动', '返程'],
    meetsActivity: false,
    shortfallMinutes: 17,
  },
  delayKeep: {
    id: 'delayKeep',
    activityName: '西岸美术馆',
    actualLifeMinutes: 230,
    actualLifeLabel: '3小时50分钟',
    homeTime: '20:55',
    arriveTime: '15:10',
    recoveredMinutes: 22,
    executionLabel: '活动顺延并同步返程',
    routeNodes: ['青浦', '共享低空', '活动', '返程'],
    meetsActivity: true,
    shortfallMinutes: 0,
    usedAir: true,
  },
  shorten: {
    id: 'shorten',
    activityName: '西岸美术馆',
    actualLifeMinutes: 232,
    actualLifeLabel: '3小时52分钟',
    homeTime: '20:48',
    arriveTime: '14:55',
    recoveredMinutes: 24,
    executionLabel: '紧凑衔接准时入场',
    routeNodes: ['青浦', '共享低空', '活动', '返程'],
    meetsActivity: true,
    shortfallMinutes: 0,
    usedAir: true,
  },
  nearbyWait: {
    id: 'nearbyWait',
    activityName: '西岸美术馆',
    actualLifeMinutes: 220,
    actualLifeLabel: '3小时40分钟',
    homeTime: '20:50',
    arriveTime: '15:10',
    recoveredMinutes: 12,
    executionLabel: '附近停留后再入场',
    routeNodes: ['青浦', '等候', '活动', '返程'],
    meetsActivity: true,
    shortfallMinutes: 0,
    usedAir: true,
  },
}

function formatLifeLabel(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (m === 0) return `${h}小时`
  return `${h}小时${String(m).padStart(2, '0')}分钟`
}

function readJson(storage, key) {
  try {
    return JSON.parse(storage.getItem(key) || 'null')
  } catch {
    return null
  }
}

export function saveFinalAdjustmentChoice(payload) {
  const choice = {
    choiceId: payload?.selectedTrip?.id || payload?.choiceId || '',
    title: payload?.selectedTrip?.title || payload?.title || '',
    activityName:
      payload?.selectedTrip?.mode ||
      payload?.selectedTrip?.title ||
      payload?.activityName ||
      '',
    lifeMinutes: payload?.selectedTrip?.lifeMinutes,
    home: payload?.selectedTrip?.home,
    arrive: payload?.selectedTrip?.arrive,
    coinHint: Boolean(payload?.selectedTrip?.coinHint),
    activityOk: payload?.selectedTrip?.activityOk,
    reason: payload?.reason || 'weather',
    planType: payload?.planType,
    savedAt: Date.now(),
  }
  window.localStorage.setItem(FINAL_ADJUSTMENT_KEY, JSON.stringify(choice))
  window.sessionStorage.setItem(TRIP_ADJUST_SESSION_KEY, JSON.stringify(payload))
  return choice
}

function resolveChoiceId(locationState, storedChoice, storedAdjust) {
  return (
    locationState?.selectedTrip?.id ||
    locationState?.choiceId ||
    storedChoice?.choiceId ||
    storedAdjust?.selectedTrip?.id ||
    ''
  )
}

function resolveResultMode(searchParams, choiceId, choiceMeta) {
  const raw = searchParams?.get?.('result')
  if (raw === 'partial' || raw === 'fulfilled') return raw
  if (choiceId === 'keepOriginal' || choiceMeta?.coinHint || choiceMeta?.activityOk === 'partial') {
    return 'partial'
  }
  return 'fulfilled'
}

export function resolveTripResultContext(locationState = {}, searchParams) {
  const booking = resolveBookingSuccessContext(locationState, searchParams)
  const plan = getPlanDetail(booking.planType)
  const activityTarget = getActivityDurationTarget(booking.planType)

  const storedChoice = readJson(window.localStorage, FINAL_ADJUSTMENT_KEY)
  const storedAdjust = readJson(window.sessionStorage, TRIP_ADJUST_SESSION_KEY)
  const choiceId = resolveChoiceId(locationState, storedChoice, storedAdjust)
  const choiceMeta =
    locationState?.selectedTrip ||
    storedAdjust?.selectedTrip ||
    storedChoice ||
    null

  const resultMode = resolveResultMode(searchParams, choiceId, choiceMeta)

  let outcome =
    CHOICE_OUTCOMES[choiceId] ||
    (resultMode === 'partial' ? CHOICE_OUTCOMES.keepOriginal : CHOICE_OUTCOMES.rainRoute)

  if (resultMode === 'partial') {
    outcome = {
      ...CHOICE_OUTCOMES.keepOriginal,
      activityName:
        choiceId === 'altActivity'
          ? CHOICE_OUTCOMES.altActivity.activityName
          : choiceId === 'rainRoute'
            ? CHOICE_OUTCOMES.rainRoute.activityName
            : CHOICE_OUTCOMES.keepOriginal.activityName,
      executionLabel:
        CHOICE_OUTCOMES[choiceId]?.executionLabel ||
        CHOICE_OUTCOMES.keepOriginal.executionLabel,
      routeNodes:
        CHOICE_OUTCOMES[choiceId]?.routeNodes ||
        CHOICE_OUTCOMES.keepOriginal.routeNodes,
    }
  } else if (!choiceId) {
    outcome = CHOICE_OUTCOMES.rainRoute
  }

  // Align activity name with P18 selection when available
  if (choiceId === 'altActivity' && resultMode !== 'partial') {
    outcome = CHOICE_OUTCOMES.altActivity
  }
  if (choiceId === 'rainRoute' && resultMode !== 'partial') {
    outcome = CHOICE_OUTCOMES.rainRoute
  }
  if (choiceId === 'keepOriginal' && resultMode === 'fulfilled') {
    // Demo override: force all complete with rain-route-level life time
    outcome = {
      ...CHOICE_OUTCOMES.rainRoute,
      activityName: '西岸美术馆',
      executionLabel: '快速地面前往原活动',
      routeNodes: ['青浦', '地面接驳', '原活动', '返程'],
    }
  }

  const originalAvailable = 360
  const groundBaseline = 208
  const actualLife = outcome.actualLifeMinutes
  const transitMinutes = originalAvailable - actualLife
  const recovered = Math.max(0, actualLife - groundBaseline)

  const activityOk =
    resultMode === 'fulfilled' ? true : actualLife >= activityTarget.minutes
  const shortfall = Math.max(0, activityTarget.minutes - actualLife)
  const returnOk = true
  const arrivalSelected = Boolean(
    booking.selectedGuaranteeItems?.some((item) => item.id === 'arrival'),
  )
  const arrivalOk = outcome.arriveTime <= '14:30'

  const timeCoinReward = activityOk ? 0 : 30
  const completedCount =
    (activityOk ? 1 : 0) + (returnOk ? 1 : 0) + (arrivalSelected && arrivalOk ? 1 : 0)
  const totalGuarantees = 2 + (arrivalSelected ? 1 : 0)

  const cabin = plan.cabin
  const routeType = plan.routeType || '快捷航线'
  const usedAir = Boolean(outcome.usedAir)

  return {
    ...booking,
    plan,
    resultMode,
    choiceId: outcome.id,
    activityTarget,
    finalTripResult: {
      originalAvailableTime: originalAvailable,
      actualLifeTime: actualLife,
      actualLifeLabel: formatLifeLabel(actualLife),
      groundBaselineLifeTime: groundBaseline,
      recoveredTime: recovered,
      transitMinutes,
      transitLabel: formatLifeLabel(transitMinutes),
      actualHomeTime: outcome.homeTime,
      actualArriveTime: outcome.arriveTime,
      activityGuaranteeTarget: activityTarget.minutes,
      activityActual: actualLife,
      returnGuarantee: '21:00',
      guaranteeCompleted: activityOk && returnOk,
      timeCoinReward,
    },
    guaranteesCompare: [
      {
        id: 'activity',
        title: '活动时长保障',
        target: activityTarget.target,
        targetLabel: activityTarget.target,
        actual: formatLifeLabel(actualLife),
        status: activityOk ? 'done' : 'partial',
        statusLabel: activityOk ? '✓ 已完成' : '未完全实现',
        deltaLabel: activityOk
          ? `多出 ${actualLife - activityTarget.minutes} 分钟`
          : `差额 ${shortfall} 分钟`,
      },
      {
        id: 'return',
        title: '返程保障',
        target: '21:00前回家',
        targetLabel: '21:00 前回家',
        actual: `${outcome.homeTime}到家`,
        status: 'done',
        statusLabel: '✓ 已完成',
        deltaLabel: `提前 ${Math.max(
          0,
          21 * 60 -
            (Number(outcome.homeTime.slice(0, 2)) * 60 +
              Number(outcome.homeTime.slice(3, 5))),
        )} 分钟`,
      },
      ...(arrivalSelected
        ? [
            {
              id: 'arrival',
              title: '到达保障',
              target: '14:30前到达',
              targetLabel: '14:30 前到达',
              actual: `${outcome.arriveTime} 抵达`,
              status: arrivalOk ? 'done' : 'partial',
              statusLabel: arrivalOk ? '✓ 已完成' : '未完全实现',
              deltaLabel: arrivalOk ? '按时到达' : '略晚于目标',
            },
          ]
        : []),
    ],
    bank: {
      recoveredLabel: recovered > 0 ? `+${recovered}分钟` : '0分钟',
      guaranteeScore: `${Math.min(completedCount, 2)} / 2`,
      timeCoinReward,
      cumulativeCoins: 126 + timeCoinReward,
      cumulativeLifeLabel: '4小时08分钟',
    },
    summary: {
      activityName: outcome.activityName,
      routeNodes: outcome.routeNodes,
      homeTime: outcome.homeTime,
      companions: '朋友 · 2人',
      plannedService: `${cabin} + ${routeType}`,
      actualExecution: usedAir
        ? `${cabin} + ${routeType}`
        : outcome.executionLabel,
      usedAir,
    },
  }
}
