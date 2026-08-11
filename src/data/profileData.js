import {
  minutesToLabel,
  readOwnedBenefits,
  readTimeCoins,
  timeBankBase,
} from './timeBankData'
import { resolveWeekendReportContext } from './weekendReportData'

export const PROFILE_PREFS_KEY = 'airmaas_profile_prefs'

export const interestOptions = [
  { id: 'exhibit', label: '看展' },
  { id: 'show', label: '演出' },
  { id: 'walk', label: '城市散步' },
  { id: 'date', label: '约会' },
  { id: 'coffee', label: '咖啡' },
  { id: 'family', label: '亲子' },
  { id: 'parents', label: '带父母' },
  { id: 'night', label: '夜景' },
]

export const defaultInterests = ['exhibit', 'walk', 'date']

export const defaultPace = ['轻松', '少换乘', '不赶时间']

export const interactionOptions = [
  { id: 'quiet', label: '安静同行' },
  { id: 'light', label: '轻度交流' },
  { id: 'open', label: '愿意认识同行者' },
]

export const accessibilityOptions = [
  { id: 'elders', label: '经常携带长辈' },
  { id: 'kids', label: '经常携带儿童' },
  { id: 'a11y', label: '需要无障碍支持' },
  { id: 'buffer', label: '希望增加换乘缓冲' },
  { id: 'quietMode', label: '偏好安静模式' },
]

export const defaultAccessibility = ['buffer']

export const defaultAuth = {
  optimize: true,
  saveMemory: true,
  personalize: true,
  desensitize: true,
}

export const companions = [
  {
    id: 'friend',
    title: '朋友 · 小林',
    detail: '常一起：看展 / 演出',
  },
  {
    id: 'parents',
    title: '父母',
    detail: '偏好：少换乘 / 安静 / 更长缓冲',
  },
  {
    id: 'child',
    title: '孩子',
    detail: '需求：亲子 / 儿童同行',
  },
]

export const privacyItems = [
  {
    id: 'location',
    title: '位置与行程数据',
    desc: '仅用于行程规划和执行，公开分享默认隐藏精确位置。',
  },
  {
    id: 'companions',
    title: '同行信息',
    desc: '默认匿名展示，不向其他同行公开真实身份。',
  },
  {
    id: 'memory',
    title: '记忆航线',
    desc: '分享前可选择隐藏：起点、精确轨迹、同行人、费用。',
  },
  {
    id: 'ai',
    title: 'AI使用说明',
    desc: 'AI用于帮助理解需求和生成方案建议，最终方案由用户确认。',
  },
]

export const settingLinks = [
  { id: 'notify', label: '通知设置' },
  { id: 'pay', label: '支付与退款说明' },
  { id: 'help', label: '帮助与反馈' },
  { id: 'about', label: '关于 AirMaaS' },
  { id: 'logout', label: '退出登录' },
]

function readPrefs() {
  try {
    return JSON.parse(window.sessionStorage.getItem(PROFILE_PREFS_KEY) || 'null')
  } catch {
    return null
  }
}

export function saveProfilePrefs(prefs) {
  window.sessionStorage.setItem(PROFILE_PREFS_KEY, JSON.stringify(prefs))
}

export function resolveProfileContext(locationState = {}, searchParams) {
  const report = resolveWeekendReportContext(locationState, searchParams)
  const stored = readPrefs() || {}
  const coins = readTimeCoins()
  const owned = readOwnedBenefits()

  const memories = [
    {
      id: 'rain',
      title: report.cover?.title || '雨天西岸 · 慢下来的一天',
      date: '周六 06-24',
      tags: ['朋友同行', '看展 / 咖啡 / 滨江散步'],
      lifeLabel: `${report.finalTripResult.actualLifeLabel} 真正留给生活`,
      action: 'view',
      actionLabel: '查看',
    },
    {
      id: 'night',
      title: '城市夜游',
      date: '周六 06-15',
      tags: ['天空散步', '朋友同行'],
      lifeLabel: '3小时40分钟生活时间',
      action: 'replica',
      actionLabel: '复刻',
    },
    {
      id: 'parents',
      title: '带父母看展',
      date: '周日 06-08',
      tags: ['陪伴型周末', '少换乘'],
      lifeLabel: '3小时25分钟生活时间',
      action: 'replica',
      actionLabel: '复刻',
    },
  ]

  return {
    user: {
      avatarText: '阿',
      nickname: '阿晨',
      city: '上海',
      monthlyLifeLabel: minutesToLabel(timeBankBase.monthlyRecoveredMinutes),
    },
    stats: {
      weekends: 8,
      totalLifeLabel: minutesToLabel(timeBankBase.totalRecoveredMinutes),
      memories: 6,
      timeCoins: coins,
    },
    memories,
    companions,
    interests: stored.interests || defaultInterests,
    pace: stored.pace || defaultPace,
    interaction: stored.interaction || 'quiet',
    lowAir: {
      express: '偶尔选择',
      skywalk: '喜欢',
    },
    services: [
      { name: '同频共飞舱', note: '较常使用' },
      { name: '陪伴舱', note: '家庭同行时使用' },
      { name: '冲场舱', note: '时间敏感活动使用' },
    ],
    accessibility: stored.accessibility || defaultAccessibility,
    ownedBenefits: owned.slice(0, 2),
    collection: {
      savedWeekends: 4,
      replicated: 2,
      savedActivities: 7,
    },
    privacyItems,
    auth: stored.auth || defaultAuth,
    settingLinks,
  }
}
