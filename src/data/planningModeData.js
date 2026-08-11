export const PLANNING_MODE_KEY = 'airmaas_planning_mode'
export const DIRECT_PLAN_SNAPSHOT_KEY = 'airmaas_direct_plan_snapshot'

export function setPlanningMode(mode) {
  const next = mode === 'direct' ? 'direct' : 'ai'
  try {
    window.localStorage.setItem(PLANNING_MODE_KEY, next)
  } catch {
    // ignore
  }
  return next
}

export function getPlanningMode() {
  try {
    const raw = window.localStorage.getItem(PLANNING_MODE_KEY)
    if (raw === 'direct' || raw === 'ai') return raw
  } catch {
    // ignore
  }
  return 'ai'
}

export function resolvePlanningMode(locationState) {
  if (locationState?.planningMode === 'direct' || locationState?.planningMode === 'ai') {
    return locationState.planningMode
  }
  if (locationState?.source === 'direct-plan') return 'direct'
  if (
    locationState?.source === 'smart-plan' ||
    locationState?.source === 'need-confirm'
  ) {
    return 'ai'
  }
  return getPlanningMode()
}

export function saveDirectPlanSnapshot(snapshot) {
  try {
    window.localStorage.setItem(
      DIRECT_PLAN_SNAPSHOT_KEY,
      JSON.stringify(snapshot),
    )
  } catch {
    // ignore
  }
}

export function readDirectPlanSnapshot() {
  try {
    return JSON.parse(window.localStorage.getItem(DIRECT_PLAN_SNAPSHOT_KEY) || 'null')
  } catch {
    return null
  }
}

export const generatingCopyByMode = {
  ai: {
    title: '正在为你设计周末',
    subtitleLead: '我们正在比较活动、交通和返程组合，',
    subtitleTail: (hours) => `看看怎样让这 ${hours} 小时更值得。`,
    doneTitle: '3个周末方案已生成',
    doneDesc: '活动、交通、返程和生活时间都已整理完成，可以开始比较了。',
    doneCta: '查看我的周末方案',
    steps: [
      '正在寻找适合的周末活动',
      '正在比较地面与低空方案',
      '正在计算能留下多少生活时间',
      '正在匹配共享服务与返程资源',
      '正在生成三个周末方案',
    ],
    hints: [
      '正在查看适合周六下午的活动',
      '正在判断低空是否真的能节省门到门时间',
      '正在检查返程能否在21:00前完成',
      '正在避免不必要的换乘和等待',
      '正在整理最终三个方案',
    ],
  },
  direct: {
    title: '正在为你规划这次行程',
    subtitleLead: '目的地已经确定，',
    subtitleTail: () => '我们正在比较怎样去更省时间、更从容。',
    doneTitle: '3个出行方案已生成',
    doneDesc: '交通、共享服务、返程和生活时间都已整理完成，可以开始比较了。',
    doneCta: '查看出行方案',
    steps: [
      '正在确认你的目的地与时间要求',
      '正在比较地面与低空方案',
      '正在计算可保留的活动时间',
      '正在匹配共享班次与返程资源',
      '正在生成三个出行方案',
    ],
    hints: [
      '正在确认西岸美术馆与时间要求',
      '正在判断低空是否真的能节省门到门时间',
      '正在检查返程能否在21:00前完成',
      '正在匹配共享班次与返程资源',
      '正在整理最终三个出行方案',
    ],
  },
}

export const compareModeCopy = {
  direct: {
    tag: '目的地已确定',
    title: '为你比较 3 个出行方案',
    tip: '西岸美术馆不变，以下方案主要比较不同交通、共享服务和时间结果。',
    summaryDesc:
      '目的地与活动已固定，我们重点比较怎样去、怎样回，以及能留下多少活动时间。',
  },
  ai: {
    tag: '体验导向智能规划',
    title: '为你找到 3 个周末方案',
    tip: '以下方案根据你的时间、同行关系和体验偏好生成。',
    summaryDesc:
      '我们已经比较活动、交通和返程，看看每种方案真正能留下多少生活时间。',
  },
}

export function enrichPlansForMode(plans, mode, destination = '西岸美术馆') {
  if (mode !== 'direct') return plans
  return plans.map((plan) => ({
    ...plan,
    destination,
    activityLabel: `${destination}看展`,
    lifeLabel: '活动时间',
    transport: plan.transport.map((item) =>
      item.includes('美术馆') || item.includes('活动') ? destination : item,
    ),
  }))
}

const AI_RECOMMEND = {
  recommendId: 'experience',
  recommendName: '体验优先',
  whyRecommend:
    '你希望轻松约会并兼顾看展体验。体验优先方案在满足 21:00 前回家的前提下，通过同频共飞舱与天空散步航线保留城市体验，同时仍比纯地面方案多留下约 30 分钟生活时间。',
}

const DIRECT_REASONS = {
  time: {
    recommendId: 'time',
    recommendName: '时间优先',
    whyRecommend:
      '目的地已经确定，且你有明确到达时间要求。时间优先方案预计可为你保留4小时20分钟活动时间，比纯地面方案多留52分钟，同时满足当前返程要求。',
  },
  timeDefault: {
    recommendId: 'time',
    recommendName: '时间优先',
    whyRecommend:
      '目的地已经确定。时间优先方案预计可为你保留4小时20分钟活动时间，比纯地面方案多留52分钟，同时满足当前返程要求。',
  },
  experience: {
    recommendId: 'experience',
    recommendName: '体验优先',
    whyRecommend:
      '目的地已经确定，且你希望保留天空散步或观景体验。体验优先方案在仍前往同一目的地的前提下，通过同频共飞舱与天空散步航线增加城市体验，预计保留3小时58分钟活动时间。',
  },
  relax: {
    recommendId: 'relax',
    recommendName: '轻松优先',
    whyRecommend:
      '目的地已经确定，且你有长辈、儿童、无障碍或少换乘等从容出行需求。轻松优先方案以陪伴舱与更少换乘衔接前往同一目的地，预计保留3小时45分钟活动时间。',
  },
}

function collectDirectSignals(inputs = {}) {
  const specialNeeds = inputs.specialNeeds || []
  const textBlob = [
    inputs.to,
    inputs.destination,
    inputs.from,
    inputs.timeValue,
    inputs.returnTime,
    inputs.budget,
    ...(specialNeeds || []),
  ]
    .filter(Boolean)
    .join(' ')

  const strongTime =
    inputs.timeMode === 'arrive' ||
    /必须|几点前到达|到达保障|准时/.test(textBlob)

  const scenicPref =
    specialNeeds.includes('skywalk') ||
    specialNeeds.includes('scenic') ||
    /天空散步|观景|夜景|景观/.test(textBlob)

  const relaxedPref =
    specialNeeds.includes('child') ||
    specialNeeds.includes('elder') ||
    specialNeeds.includes('access') ||
    /少换乘|长辈|儿童|无障碍|亲子|带父母/.test(textBlob)

  return { strongTime, scenicPref, relaxedPref }
}

/**
 * P07 推荐：direct 只依据 P03 明确输入；ai 保持体验偏好逻辑。
 */
export function resolveCompareRecommendation(planningMode, inputs = {}) {
  if (planningMode !== 'direct') {
    return { ...AI_RECOMMEND }
  }

  const { strongTime, scenicPref, relaxedPref } = collectDirectSignals(inputs)

  if (strongTime) return { ...DIRECT_REASONS.time }
  if (scenicPref) return { ...DIRECT_REASONS.experience }
  if (relaxedPref) return { ...DIRECT_REASONS.relax }
  return { ...DIRECT_REASONS.timeDefault }
}

export function applyRecommendBadge(plans, recommendId) {
  return plans.map((plan) => ({
    ...plan,
    badge: plan.id === recommendId ? '推荐' : '',
  }))
}
