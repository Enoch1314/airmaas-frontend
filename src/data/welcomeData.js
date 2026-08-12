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

export const welcomeAssets = {
  /** false = clean photo plates + HTML UI overlay */
  mockupPlates: false,
  brandBg: '/images/welcome/bg-brand.jpg',
  directBg: '/images/welcome/bg-direct.jpg',
  smartBg: '/images/welcome/bg-smart.jpg',
  guaranteeBg: '/images/welcome/bg-guarantee.jpg',
  evtol: '/images/welcome/evtol.png',
  robot: '/images/welcome/robot.png',
  memory: [
    '/images/welcome/memory-1.jpg',
    '/images/welcome/memory-2.jpg',
    '/images/welcome/memory-3.jpg',
  ],
}

export const welcomeSlides = [
  {
    id: 'brand',
    visual: 'brand',
    progress: '1/4',
    bg: welcomeAssets.brandBg,
  },
  {
    id: 'direct',
    visual: 'direct',
    progress: '2/4',
    bg: welcomeAssets.directBg,
    title: '目的地明确',
    titleLine2: '直接规划行程',
    subtitle: '输入起点、目的地和时间，\n快速生成空地联程方案。',
    fields: [
      { label: '从哪里出发', value: '青浦' },
      { label: '想去哪里', value: '西岸美术馆' },
      { label: '出发时间', value: '周六 13:10' },
      { label: '同行人数', value: '2人' },
    ],
  },
  {
    id: 'smart',
    visual: 'smart',
    progress: '3/4',
    bg: welcomeAssets.smartBg,
    title: '还没想好去哪？',
    titleLine2: '让智能体设计周末',
    subtitle:
      '告诉我们你有多少时间、和谁一起、\n想要什么感觉，AI 帮你设计\n一段理想的周末。',
    bubble: '周六下午有6小时，\n想和朋友轻松约会，\n预算600元。',
    tags: ['看展', '演出', '带父母', '亲子', '天空散步'],
  },
  {
    id: 'guarantee',
    visual: 'guarantee',
    progress: '4/4',
    bg: welcomeAssets.guaranteeBg,
    title: '重要的时间，我们一起守住',
    subtitle:
      '天气、班次或计划发生变化时，\n平台会重新提供可执行方案，\n尽量守住你真正想要的周末时间。',
    guarantees: [
      { id: 'arrive', title: '到达保障', detail: '14:00 前抵达' },
      { id: 'activity', title: '活动时长保障', detail: '至少 3 小时' },
      { id: 'return', title: '返程保障', detail: '21:00 前到家' },
    ],
    memoryTitle: '记录每一次值得回味的周末',
    memoryDesc: '路线、活动与生活时间，\n都可以沉淀为你的周末记忆。',
    lifeSample: '4小时05分钟真正留给生活',
  },
]
