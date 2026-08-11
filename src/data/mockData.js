export const userProfile = {
  city: '上海',
  weather: '晴',
  weatherHint: '适宜低空出行',
  avatarText: '阿',
  timeReturned: '2小时22分钟',
  timeCoins: 126,
  nickname: '阿晨',
}

export const directPlanDefaults = {
  from: '青浦汇聚点',
  to: '西岸美术馆',
  departTime: '周六 06-24',
  companions: '2人',
}

export const directPlanFormDefaults = {
  from: '青浦汇聚点附近',
  to: '西岸美术馆',
  timeMode: 'depart',
  timeValue: '周六 06-24 13:10',
  companions: 2,
  returnTime: '周日 06-25 20:00',
  budget: '600 - 800元',
  acceptShare: true,
  specialNeeds: ['luggage'],
}

export const smartPlanPlaceholder = `我周六下午有6小时，
想和朋友轻松约会，
预算600元。`

export const quickTags = [
  { id: 'exhibit', label: '看展', icon: 'palette' },
  { id: 'show', label: '演出', icon: 'music' },
  { id: 'parents', label: '带父母', icon: 'heart' },
  { id: 'skywalk', label: '天空散步', icon: 'cloud' },
  { id: 'date', label: '约会', icon: 'coffee' },
  { id: 'family', label: '亲子', icon: 'smile' },
]

export const recommendations = [
  {
    id: 'rec-1',
    title: '西岸美术馆看展',
    tag: '低空+地铁',
    datetime: '06.24 周六 10:00',
    price: '¥128起',
    tone: 'blue',
  },
  {
    id: 'rec-2',
    title: '迪士尼乐园',
    tag: '低空直达',
    datetime: '06.24 周六 09:30',
    price: '¥598起',
    tone: 'mint',
  },
  {
    id: 'rec-3',
    title: '外滩夜景散步',
    tag: '天空散步',
    datetime: '06.24 周六 19:30',
    price: '¥268起',
    tone: 'violet',
  },
  {
    id: 'rec-4',
    title: '青年派对计划',
    tag: '活动体验',
    datetime: '06.25 周日 16:00',
    price: '¥199起',
    tone: 'orange',
  },
]

export const nextTrip = {
  status: '进行中',
  date: '周六 06.24',
  time: '14:10',
  from: '青浦汇聚点',
  to: '浦东美术馆',
  segment: 'eVTOL航段 · 预计14:45到达',
  lifeGainMinutes: 52,
}

export const navItems = [
  { id: 'home', label: '周末', path: '/' },
  { id: 'trips', label: '行程', path: '/itinerary' },
  { id: 'time', label: '时间', path: '/time-bank' },
  { id: 'me', label: '我的', path: '/profile' },
]

export const placeholderPages = {
  '/welcome': '启动引导',
  '/direct-plan': '直接规划',
  '/smart-plan': '帮我设计周末',
  '/need-confirm': '确认我的周末需求',
  '/generating': '方案生成中',
  '/compare': '方案比较',
  '/plan-detail': '方案详情',
  '/time-guarantee': '关键时间保障',
  '/service-select': '选择共享服务与航线',
  '/matching': '共享班次匹配',
  '/order-confirm': '确认周末方案',
  '/booking-success': '你的周末已生成',
  '/itinerary': '数字行程单',
  '/return-adjust': '调整返程',
  '/trip-adjust': '行程调整',
  '/trip-result': '行程完成与时间结算',
  '/flight-experience': '汇聚与登乘',
  '/activity': '活动进行中',
  '/time-bank': '周末时间银行',
  '/weekend-report': '周末报告与记忆航线',
  '/profile': '我的',
}
