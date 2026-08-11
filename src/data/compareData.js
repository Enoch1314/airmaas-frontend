export const compareMeta = {
  totalHours: '6',
  recommendId: 'experience',
  recommendName: '体验优先',
  whyRecommend:
    '你希望轻松约会并兼顾看展体验。体验优先方案在满足 21:00 前回家的前提下，通过同频共飞舱与天空散步航线保留城市体验，同时仍比纯地面方案多留下约 30 分钟生活时间。',
}

export const compareTable = {
  headers: ['时间优先', '体验优先', '轻松优先'],
  rows: [
    { label: '生活时间', values: ['4h20', '3h58', '3h45'] },
    { label: '费用', values: ['¥286', '¥318', '¥305'] },
    { label: '换乘', values: ['3次', '3次', '2次'] },
    { label: '准时性', values: ['高', '较高', '高'] },
    { label: '体验感', values: ['中', '高', '较高'] },
  ],
}

export const weekendPlans = [
  {
    id: 'time',
    tone: 'blue',
    name: '时间优先',
    badge: '',
    lifeTime: '4小时20分钟',
    lifeLabel: '真正留给活动',
    gainMinutes: 52,
    timeline: [
      '出发 13:10',
      '到达 14:20',
      '活动 14:30—18:50',
      '预计 20:45 到家',
    ],
    transport: ['地铁', '青浦汇聚枢纽', '共享 eVTOL', '接驳', '西岸美术馆'],
    price: '¥286',
    transfers: '3次',
    punctuality: '高',
    service: ['冲场舱', '快捷航线'],
    status: '共享班次匹配中 · 3/4人',
    statusTone: 'progress',
    selectLabel: '选择时间优先',
  },
  {
    id: 'experience',
    tone: 'orange',
    name: '体验优先',
    badge: '推荐',
    lifeTime: '3小时58分钟',
    lifeLabel: '真正留给活动',
    gainMinutes: 30,
    timeline: [
      '13:00 出发',
      '14:35 到达',
      '18:40 开始返程',
      '20:50 到家',
    ],
    transport: ['天空散步航线', '城市导览', '同频共飞舱'],
    price: '¥318',
    transfers: '3次',
    punctuality: '较高',
    experience: '高',
    service: ['天空散步航线', '同频共飞舱'],
    status: '共享班次已具备成班条件',
    statusTone: 'ready',
    selectLabel: '选择体验优先',
  },
  {
    id: 'relax',
    tone: 'green',
    name: '轻松优先',
    badge: '',
    lifeTime: '3小时45分钟',
    lifeLabel: '真正留给活动',
    gainMinutes: 17,
    timeline: ['少换乘', '更长缓冲', '陪伴型服务'],
    transport: ['地面接驳', '共享低空', '目的地接驳'],
    price: '¥305',
    transfers: '2次',
    punctuality: '高',
    fit: '不赶时间 / 带长辈 / 亲子',
    service: ['陪伴舱', '快捷航线'],
    status: '可预订',
    statusTone: 'ready',
    selectLabel: '选择轻松优先',
  },
]

export const groundPlan = {
  id: 'ground',
  name: '纯地面方案',
  lifeTime: '3小时28分钟',
  trafficTime: '2小时32分钟',
  price: '约 ¥62',
  transfers: '4次',
  note: '纯地面方案仍然可以选择，AirMaaS 只有在低空具有明确时间收益或用户主动选择天空散步体验时才推荐低空。',
}

export const SELECTED_PLAN_KEY = 'airmaas_selected_plan'
