import { resolveTripResultContext } from './tripResultData'

export const WEEKEND_FEEDBACK_KEY = 'airmaas_weekend_feedback'
export const WEEKEND_MEMORY_KEY = 'airmaas_weekend_memory_saved'

export const defaultPrivacy = {
  hideOrigin: true,
  hideTrack: true,
  hideCompanions: true,
  hideFee: true,
}

export const visibilityOptions = [
  { id: 'self', label: '仅自己' },
  { id: 'friends', label: '好友可见' },
  { id: 'public', label: '公开分享' },
]

const coverByChoice = {
  rainRoute: {
    title: '雨天西岸 · 慢下来的一天',
    mood: 'rain',
    shareHighlights: '雨天看展 / 咖啡 / 滨江散步',
  },
  altActivity: {
    title: '临时换展，也没有浪费周末',
    mood: 'indoor',
    shareHighlights: '室内特别展 / 轻松看展',
  },
  keepOriginal: {
    title: '西岸艺术周末',
    mood: 'museum',
    shareHighlights: '西岸美术馆看展',
  },
  adjacent: {
    title: '西岸艺术周末',
    mood: 'sky',
    shareHighlights: '共享低空衔接 / 西岸看展',
  },
  otherHub: {
    title: '西岸艺术周末',
    mood: 'sky',
    shareHighlights: '换枢纽衔接 / 西岸看展',
  },
  existing: {
    title: '西岸艺术周末',
    mood: 'sky',
    shareHighlights: '合并班次 / 西岸看展',
  },
  ground: {
    title: '西岸艺术周末',
    mood: 'museum',
    shareHighlights: '地面联程 / 西岸看展',
  },
  delayKeep: {
    title: '西岸艺术周末',
    mood: 'museum',
    shareHighlights: '顺延看展 / 守住返程',
  },
  shorten: {
    title: '西岸艺术周末',
    mood: 'museum',
    shareHighlights: '紧凑衔接 / 西岸看展',
  },
  nearbyWait: {
    title: '西岸艺术周末',
    mood: 'coffee',
    shareHighlights: '等候咖啡 / 西岸看展',
  },
}

const memoryRoutes = {
  rainRoute: [
    { time: '13:00', title: '从青浦出发', desc: '开始这段周末', icon: 'home' },
    {
      time: '14:05',
      title: '原计划低空航段受天气影响',
      desc: '计划发生变化，先说明原因',
      icon: 'cloud',
    },
    {
      time: '14:20',
      title: '行程完成调整',
      desc: '选定雨天城市路线继续周末',
      icon: 'adjust',
    },
    {
      time: '14:40',
      title: '开始雨天城市体验',
      desc: '把时间留给室内与滨江',
      icon: 'city',
    },
    { time: '15:10', title: '室内展览', desc: '慢慢看展，不被雨打断', icon: 'art' },
    { time: '16:40', title: '滨江咖啡', desc: '停一下，聊聊今天的节奏', icon: 'coffee' },
    { time: '17:30', title: '雨天城市散步', desc: '短短一段城市漫步', icon: 'walk' },
    { time: '18:45', title: '开始返程', desc: '按保障目标往回走', icon: 'return' },
    { time: '20:40', title: '到家', desc: '这个周末真正落地了', icon: 'home' },
  ],
  altActivity: [
    { time: '13:00', title: '从青浦出发', desc: '周末按时出门', icon: 'home' },
    {
      time: '14:05',
      title: '原计划低空航段暂不可用',
      desc: '平台先说明变化事实',
      icon: 'cloud',
    },
    {
      time: '14:20',
      title: '改去附近室内展览',
      desc: '保住更多活动时间',
      icon: 'adjust',
    },
    {
      time: '14:48',
      title: '开始特别展',
      desc: '西岸艺术中心特别展',
      icon: 'art',
    },
    { time: '16:30', title: '展厅深处停留', desc: '多看一会儿也不赶', icon: 'art' },
    { time: '18:20', title: '附近短暂停留', desc: '轻松收尾', icon: 'coffee' },
    { time: '18:50', title: '开始返程', desc: '守住回家时间', icon: 'return' },
    { time: '20:45', title: '到家', desc: '周末没有被打乱', icon: 'home' },
  ],
  keepOriginal: [
    { time: '13:00', title: '从青浦出发', desc: '按周末计划出门', icon: 'home' },
    {
      time: '14:05',
      title: '低空航段暂不可用',
      desc: '改走快速地面继续原活动',
      icon: 'cloud',
    },
    {
      time: '15:02',
      title: '抵达西岸美术馆',
      desc: '原活动继续',
      icon: 'art',
    },
    { time: '16:40', title: '展厅漫步', desc: '把时间留给作品', icon: 'art' },
    { time: '18:30', title: '结束看展', desc: '准备返程', icon: 'city' },
    { time: '18:50', title: '开始返程', desc: '仍按返程保障安排', icon: 'return' },
    { time: '20:55', title: '到家', desc: '原活动保住了', icon: 'home' },
  ],
  sky: [
    { time: '13:00', title: '从青浦出发', desc: '前往汇聚枢纽', icon: 'home' },
    { time: '14:05', title: '共享低空起飞', desc: '天空散步航线开启', icon: 'sky' },
    { time: '14:28', title: '空中城市景观', desc: '城市轮廓慢慢展开', icon: 'city' },
    { time: '14:40', title: '开始看展', desc: '西岸美术馆', icon: 'art' },
    { time: '16:50', title: '展厅与休息', desc: '节奏刚好', icon: 'coffee' },
    { time: '18:40', title: '开始返程', desc: '联程返回', icon: 'return' },
    { time: '20:50', title: '到家', desc: '周末圆满收尾', icon: 'home' },
  ],
}

const stampsByChoice = {
  rainRoute: [
    { id: 'coffee', label: '雨天咖啡' },
    { id: 'art', label: '艺术看展' },
    { id: 'rain', label: '雨中散步' },
    { id: 'friends', label: '朋友同行' },
    { id: 'return', label: '守住返程' },
    { id: 'city', label: '城市生活' },
  ],
  altActivity: [
    { id: 'art', label: '艺术看展' },
    { id: 'flex', label: '灵活换展' },
    { id: 'friends', label: '朋友同行' },
    { id: 'return', label: '守住返程' },
    { id: 'city', label: '城市生活' },
  ],
  keepOriginal: [
    { id: 'art', label: '艺术看展' },
    { id: 'ground', label: '地面续行' },
    { id: 'friends', label: '朋友同行' },
    { id: 'return', label: '守住返程' },
    { id: 'city', label: '城市生活' },
  ],
  sky: [
    { id: 'sky', label: '空中景观' },
    { id: 'art', label: '艺术看展' },
    { id: 'friends', label: '朋友同行' },
    { id: 'return', label: '守住返程' },
    { id: 'city', label: '城市生活' },
  ],
}

function readJson(storage, key) {
  try {
    return JSON.parse(storage.getItem(key) || 'null')
  } catch {
    return null
  }
}

export function saveWeekendFeedback(payload) {
  window.sessionStorage.setItem(WEEKEND_FEEDBACK_KEY, JSON.stringify(payload))
}

export function readWeekendFeedback() {
  return readJson(window.sessionStorage, WEEKEND_FEEDBACK_KEY) || {}
}

function resolveMemoryKey(choiceId, usedAir) {
  if (choiceId === 'rainRoute') return 'rainRoute'
  if (choiceId === 'altActivity') return 'altActivity'
  if (choiceId === 'keepOriginal' || choiceId === 'ground') return 'keepOriginal'
  if (usedAir) return 'sky'
  return 'keepOriginal'
}

function buildPhotos(usedAir, choiceId) {
  if (usedAir) {
    return [
      { id: 'sky', label: '空中城市景观', tone: 'sky' },
      { id: 'museum', label: '美术馆', tone: 'art' },
      { id: 'river', label: '滨江', tone: 'river' },
      { id: 'cafe', label: '咖啡', tone: 'cafe' },
    ]
  }

  const base = [
    { id: 'museum', label: '美术馆', tone: 'art' },
    { id: 'river', label: '滨江', tone: 'river' },
    { id: 'cafe', label: '咖啡', tone: 'cafe' },
    { id: 'city', label: choiceId === 'rainRoute' ? '雨天城市' : '城市街景', tone: 'rain' },
  ]

  return base
}

function buildPlanCompare(resultCtx) {
  const cabin = resultCtx.plan?.cabin || '同频共飞舱'
  const routeType = resultCtx.plan?.routeType || '天空散步航线'
  const usedAir = Boolean(resultCtx.summary?.usedAir)

  if (resultCtx.choiceId === 'rainRoute') {
    return {
      planned: [cabin, routeType, '西岸美术馆'],
      actualSteps: ['天气变化', '雨天城市路线', '室内展览 + 咖啡 + 滨江散步'],
    }
  }

  if (resultCtx.choiceId === 'altActivity') {
    return {
      planned: [cabin, routeType, '西岸美术馆'],
      actualSteps: ['计划发生变化', '替代室内活动', '西岸艺术中心特别展'],
    }
  }

  if (!usedAir) {
    return {
      planned: [cabin, routeType, '西岸美术馆'],
      actualSteps: ['计划发生变化', resultCtx.summary.actualExecution, resultCtx.summary.activityName],
    }
  }

  return {
    planned: [cabin, routeType, '西岸美术馆'],
    actualSteps: ['按原计划执行', `${cabin} + ${routeType}`, resultCtx.summary.activityName],
  }
}

export function resolveWeekendReportContext(locationState = {}, searchParams) {
  const resultParams = new URLSearchParams(searchParams?.toString?.() || '')
  // Keep result/type from query; mode is report-only
  const trip = resolveTripResultContext(locationState, resultParams)
  const feedbackStored = readWeekendFeedback()
  const feedback = {
    rating: locationState?.rating ?? feedbackStored.rating ?? 5,
    tags: locationState?.tags || feedbackStored.tags || ['easy', 'pace'],
    userNote:
      locationState?.userNote ||
      locationState?.note ||
      feedbackStored.userNote ||
      '今天终于没有把大半天花在路上。',
  }

  const choiceId = trip.choiceId || 'rainRoute'
  const cover =
    coverByChoice[choiceId] ||
    (trip.summary.usedAir ? coverByChoice.adjacent : coverByChoice.keepOriginal)

  const memoryKey = resolveMemoryKey(choiceId, trip.summary.usedAir)
  let memoryRoute = memoryRoutes[memoryKey] || memoryRoutes.rainRoute

  // Sync end node home time with final result
  memoryRoute = memoryRoute.map((node, index, arr) => {
    if (index === arr.length - 1) {
      return {
        ...node,
        time: trip.finalTripResult.actualHomeTime,
      }
    }
    return node
  })

  const modeRaw = searchParams?.get?.('mode')
  const mode = modeRaw === 'share' ? 'share' : 'private'
  const shareMode = mode === 'share'

  const companionsPrivate = trip.summary.companions
  const companionsPublic = '好友同行'

  const originPrivate = '从青浦出发'
  const originPublic = '从出发地出发'

  if (shareMode) {
    memoryRoute = memoryRoute.map((node) => {
      if (node.title.includes('青浦')) {
        return { ...node, title: originPublic, desc: '开始这段周末' }
      }
      return node
    })
  }

  const stamps =
    stampsByChoice[memoryKey] ||
    stampsByChoice.keepOriginal

  const photos = buildPhotos(trip.summary.usedAir, choiceId)
  const compare = buildPlanCompare(trip)

  const saved = Boolean(readJson(window.localStorage, WEEKEND_MEMORY_KEY)?.saved)

  return {
    ...trip,
    mode,
    shareMode,
    cover: {
      ...cover,
      dateLabel: '周六 06-24',
      companions: shareMode ? companionsPublic : companionsPrivate,
    },
    memoryRoute,
    stamps,
    photos,
    compare,
    feedback,
    skyNote: trip.summary.usedAir
      ? null
      : '原计划天空散步航线未执行',
    replica: {
      time: '周六下午约6小时',
      companions: shareMode ? '好友' : '朋友',
      vibe: '轻松 / 看展 / 少换乘',
      returnHome: '21:00前',
      activity: trip.summary.activityName,
    },
    saved,
    privacyDefaults: defaultPrivacy,
  }
}

export function markWeekendMemorySaved() {
  window.localStorage.setItem(
    WEEKEND_MEMORY_KEY,
    JSON.stringify({ saved: true, at: Date.now() }),
  )
}

export function buildReplicaState(ctx, variant = 'exact') {
  return {
    fromMemoryRoute: true,
    variant,
    preferences: {
      timeWindow: ctx.replica.time,
      companions: 'friends',
      vibe: ctx.replica.vibe,
      returnHome: ctx.replica.returnHome,
      activity: variant === 'similar' ? '类似看展活动' : ctx.replica.activity,
      day: variant === 'otherDay' ? '另选一天' : '周六',
    },
    sourceTitle: ctx.cover.title,
  }
}
