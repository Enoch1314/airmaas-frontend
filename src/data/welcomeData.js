export const ONBOARDING_SEEN_KEY = 'airmaas_onboarding_seen'

export function hasSeenOnboarding() {
  try {
    return window.localStorage.getItem(ONBOARDING_SEEN_KEY) === 'true'
  } catch {
    return false
  }
}

export function markOnboardingSeen() {
  try {
    window.localStorage.setItem(ONBOARDING_SEEN_KEY, 'true')
  } catch {
    // ignore quota / private mode
  }
}

export const welcomeSlides = [
  {
    id: 'life',
    title: '把周末还给生活',
    subtitle: '少一点赶路，\n多一点真正属于自己的时间。',
    keyword: '生活时间',
    visual: 'life',
  },
  {
    id: 'direct',
    title: '已经想好去哪？',
    subtitle:
      '告诉我们目的地和时间要求，\nAirMaaS 帮你比较地面与低空方案，\n看看怎样留下更多活动时间。',
    footer: '目的地明确，直接规划。',
    visual: 'direct',
    flow: ['起点', '地面交通', '共享低空', '活动'],
  },
  {
    id: 'smart',
    title: '还没想好去哪？',
    subtitle:
      '告诉我们你有多少时间、\n和谁一起、想要什么感觉，\n我们帮你设计这个周末。',
    bubble: '周六下午有6小时，\n想和朋友轻松约会。',
    tags: ['轻松', '看展', '带父母', '亲子', '天空散步'],
    footer: '先想怎样过，\n再决定去哪。',
    visual: 'smart',
  },
  {
    id: 'guarantee',
    title: '重要的时间，我们一起守住',
    subtitle:
      '天气、班次或计划发生变化时，\n平台会重新提供可执行方案，\n尽量守住你真正想要的周末时间。',
    guarantees: ['到达保障', '活动时长保障', '返程保障'],
    bankNote: '行程结束后，这些生活时间还会记录到「周末时间银行」。',
    visual: 'guarantee',
  },
]
