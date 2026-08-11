import { getActivityDurationTarget } from './guaranteeData'

export const planDetails = {
  time: {
    id: 'time',
    planType: '时间优先',
    subtitle: '周六 · 西岸美术馆看展',
    activityTime: '4小时20分钟',
    recoveredTime: 52,
    price: 286,
    transfers: 3,
    arrivalHome: '20:45',
    cabin: '冲场舱',
    routeType: '快捷航线',
    airLabel: 'eVTOL 快捷航线',
    flightHint: '共享低空航段 · 预计飞行 15 分钟',
    shareStatus: '3 / 4 人正在匹配',
    formStatus: '较高',
    recommended: true,
    features: ['最大化活动时间', '优先准时抵达'],
    serviceNote:
      '适合演出、展览等有明确时间要求的活动，重点保障衔接效率和准时抵达。冲场舱是服务组织方式，不是飞行器物理隔舱。',
    whyTitle: '为什么这一段使用低空？',
    whyLead:
      '如果全程使用地面交通，预计需要约 2小时32分钟交通与等待。当前空地联程方案通过共享低空避开跨区域绕行和拥堵影响，预计为你多留下：',
    whyTail:
      '用于看展和自由活动。AirMaaS 只在低空具有明确门到门时间收益，或用户主动选择天空散步体验时推荐低空。',
    timeline: [
      { time: '13:10', title: '从青浦出发', desc: '地铁前往低空汇聚枢纽', type: 'ground' },
      { time: '13:42', title: '抵达青浦汇聚枢纽', desc: '候乘 / 身份核验', type: 'ground' },
      { time: '14:00', title: '共享 eVTOL 起飞', desc: '快捷航线', type: 'air' },
      { time: '14:15', title: '抵达目的地低空枢纽', desc: '共享低空航段结束', type: 'air' },
      { time: '14:20', title: '接驳至西岸美术馆', desc: '末端地面接驳', type: 'ground' },
      { time: '14:30', title: '开始看展', desc: '活动开始', type: 'activity' },
      { time: '18:50', title: '活动结束', desc: '准备返程', type: 'activity' },
      { time: '19:00', title: '开始返程', desc: '空地联程返回', type: 'return' },
      { time: '20:45', title: '预计到家', desc: '完成这次周末安排', type: 'return' },
    ],
    routeFlow: ['青浦', '地铁', '汇聚枢纽', 'eVTOL 快捷航线', '目的地枢纽', '接驳', '西岸美术馆'],
  },
  experience: {
    id: 'experience',
    planType: '体验优先',
    subtitle: '周六 · 西岸美术馆看展',
    activityTime: '3小时58分钟',
    recoveredTime: 30,
    price: 318,
    transfers: 3,
    arrivalHome: '20:50',
    cabin: '同频共飞舱',
    routeType: '天空散步航线',
    airLabel: 'eVTOL 天空散步航线',
    flightHint: '天空散步航线 · 含城市景观与数字导览',
    shareStatus: '已满足成班条件',
    formStatus: '可确认',
    recommended: false,
    features: ['城市景观', '数字导览', '同频体验'],
    serviceNote:
      '适合希望在周末中增加城市景观与同频社交体验的用户。同频共飞舱是服务组织方式，强调同行氛围而非物理隔舱。',
    whyTitle: '为什么这一段使用低空？',
    whyLead:
      '该方案虽然不是最快，但在满足返程时间要求的前提下，通过天空散步航线增加城市景观与数字导览体验，同时仍比纯地面方案多留约：',
    whyTail:
      '生活时间。AirMaaS 只在低空具有明确门到门时间收益，或用户主动选择天空散步体验时推荐低空。',
    timeline: [
      { time: '13:00', title: '从青浦出发', desc: '前往低空汇聚枢纽', type: 'ground' },
      { time: '13:40', title: '抵达青浦汇聚枢纽', desc: '候乘与同频匹配', type: 'ground' },
      { time: '14:05', title: '共享 eVTOL 起飞', desc: '天空散步航线', type: 'air' },
      { time: '14:28', title: '空中城市导览', desc: '景观段与数字讲解', type: 'air' },
      { time: '14:35', title: '抵达活动地附近', desc: '进入末端接驳', type: 'ground' },
      { time: '14:40', title: '开始看展', desc: '活动开始', type: 'activity' },
      { time: '18:38', title: '活动结束', desc: '准备返程', type: 'activity' },
      { time: '18:40', title: '开始返程', desc: '空地联程返回', type: 'return' },
      { time: '20:50', title: '预计到家', desc: '完成这次周末安排', type: 'return' },
    ],
    routeFlow: ['青浦', '地铁', '汇聚枢纽', 'eVTOL 天空散步航线', '目的地枢纽', '接驳', '西岸美术馆'],
  },
  relaxed: {
    id: 'relax',
    planType: '轻松优先',
    subtitle: '周六 · 西岸美术馆看展',
    activityTime: '3小时45分钟',
    recoveredTime: 17,
    price: 305,
    transfers: 2,
    arrivalHome: '20:45',
    cabin: '陪伴舱',
    routeType: '快捷航线',
    airLabel: 'eVTOL 快捷航线',
    flightHint: '少换乘联程 · 衔接缓冲更充足',
    shareStatus: '可预订',
    formStatus: '已满足条件',
    recommended: false,
    features: ['少换乘', '更长缓冲', '不赶时间', '适合带长辈/亲子'],
    serviceNote:
      '适合不赶时间、带长辈或亲子出行的用户。陪伴舱强调更从容的衔接节奏与服务陪伴，不是飞行器物理隔舱。',
    whyTitle: '为什么这一段使用低空？',
    whyLead:
      '该方案不追求最大化节省时间，而是通过减少换乘和增加衔接缓冲，在保证21:00前返程的同时，为用户提供更从容的周末体验。仍可比纯地面方案多留约：',
    whyTail: '生活时间，让整个下午更松弛。',
    timeline: [
      { time: '13:00', title: '从青浦出发', desc: '地面接驳前往汇聚枢纽', type: 'ground' },
      { time: '13:35', title: '抵达汇聚枢纽', desc: '预留更长候乘缓冲', type: 'ground' },
      { time: '14:00', title: '共享 eVTOL 起飞', desc: '快捷航线', type: 'air' },
      { time: '14:18', title: '抵达目的地枢纽', desc: '少换乘直达衔接', type: 'air' },
      { time: '14:30', title: '到达西岸美术馆', desc: '末端接驳完成', type: 'ground' },
      { time: '14:40', title: '开始活动', desc: '从容入场看展', type: 'activity' },
      { time: '18:25', title: '活动结束', desc: '预留返程缓冲', type: 'activity' },
      { time: '18:40', title: '开始返程', desc: '空地联程返回', type: 'return' },
      { time: '20:45', title: '预计到家', desc: '完成这次周末安排', type: 'return' },
    ],
    routeFlow: ['青浦', '地面接驳', '汇聚枢纽', 'eVTOL 快捷航线', '目的地枢纽', '西岸美术馆'],
  },
}

export const planTypeAlias = {
  time: 'time',
  experience: 'experience',
  relaxed: 'relaxed',
  relax: 'relaxed',
  时间优先: 'time',
  体验优先: 'experience',
  轻松优先: 'relaxed',
}

export function resolvePlanType(raw) {
  if (!raw) return 'time'
  return planTypeAlias[raw] || 'time'
}

export function getPlanDetail(type) {
  return planDetails[resolvePlanType(type)] || planDetails.time
}

export const backupOptions = [
  {
    title: '天气无法飞行',
    action: '快速地面接驳',
  },
  {
    title: '班次未成行',
    action: '相邻时段 / 其他枢纽 / 纯地面方案',
  },
  {
    title: '活动延迟',
    action: '调整返程安排',
  },
]

export function getGuaranteePreview(planType = 'time') {
  const activity = getActivityDurationTarget(planType)
  return ['14:30 前到达美术馆', activity.target, '21:00 前回家']
}

export const guaranteePreview = getGuaranteePreview('time')
