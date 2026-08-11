import { getActivityDurationTarget } from './guaranteeData'
import { resolveBookingSuccessContext } from './bookingSuccessData'

export const tripReasonAlias = {
  weather: 'weather',
  'no-batch': 'noBatch',
  nobatch: 'noBatch',
  noBatch: 'noBatch',
  'activity-delay': 'activityDelay',
  activityDelay: 'activityDelay',
}

export function resolveTripReason(raw) {
  if (!raw) return 'weather'
  return tripReasonAlias[raw] || 'weather'
}

export const tripAssistantQs = [
  {
    id: 'most',
    q: '哪个方案能保住最多活动时间？',
    a: '雨天城市路线预计可保留约4小时05分钟活动时间，是当前可执行方案中生活时间最多的选择。',
  },
  {
    id: 'original',
    q: '我一定要去原来的展怎么办？',
    a: '可以选择“快速地面前往西岸美术馆”。它保住原活动，但活动时长可能略低于原保障目标。',
  },
  {
    id: 'refund',
    q: '退款怎么算？',
    a: '未执行的低空航段会按规则退还差额；已使用的前端接驳按实际服务结算。最终金额在确认新安排后明确展示。',
  },
  {
    id: 'home',
    q: '还能21:00前回家吗？',
    a: '可以。当前多数替代方案预计在20:40—20:55到家，仍可满足返程保障。',
  },
]

const orderPriceByPlan = {
  time: 327,
  experience: 372,
  relaxed: 343,
}

const refundAirByPlan = {
  time: 128,
  experience: 148,
  relaxed: 132,
}

export function buildTripScenes(planType = 'experience') {
  const activityTarget = getActivityDurationTarget(planType)
  const orderPrice = orderPriceByPlan[planType] || 372
  const refundAir = refundAirByPlan[planType] || 148

  const weatherOptions = [
    {
      id: 'keepOriginal',
      badge: '推荐',
      title: '快速地面前往西岸美术馆',
      mode: '地铁 + 快速接驳',
      arrive: '15:02',
      lifeTime: '3小时36分钟',
      lifeMinutes: 216,
      home: '20:55',
      feeDelta: 18,
      feeLabel: `退还低空差额后 +¥18 地面接驳`,
      activityOk: 'partial',
      activityNote: '比原目标少9分钟',
      returnOk: true,
      coinHint: true,
      cta: '选择保住原活动',
      tone: 'blue',
    },
    {
      id: 'altActivity',
      title: '改去附近室内展览',
      mode: '西岸艺术中心特别展',
      arrive: '14:48',
      lifeTime: '3小时55分钟',
      lifeMinutes: 235,
      home: '20:45',
      feeDelta: -12,
      feeLabel: '-¥12',
      activityOk: true,
      activityNote: '活动时长要求满足',
      returnOk: true,
      coinHint: false,
      features: ['少走一段路', '保留更多活动时间'],
      cta: '选择替代活动',
      tone: 'green',
    },
    {
      id: 'rainRoute',
      title: '雨天城市路线',
      mode: '室内展览 → 滨江咖啡 → 雨天城市观景点',
      arrive: '14:40',
      lifeTime: '4小时05分钟',
      lifeMinutes: 245,
      home: '20:40',
      feeDelta: -26,
      feeLabel: '-¥26',
      activityOk: true,
      activityNote: '活动时长满足',
      returnOk: true,
      coinHint: false,
      note: '这是无法执行低空航段后的替代体验，不会淡化安全原因。',
      cta: '选择雨天体验',
      tone: 'violet',
    },
    {
      id: 'cancel',
      title: '取消本次安排',
      mode: '结束本次行程',
      arrive: '-',
      lifeTime: '-',
      lifeMinutes: 0,
      home: '-',
      feeDelta: -(orderPrice - 28),
      feeLabel: `预计退款 ¥${orderPrice - 28}`,
      activityOk: false,
      activityNote: '按实际已执行服务结算',
      returnOk: false,
      coinHint: false,
      note: '如果你不希望调整，可以结束本次行程。',
      cta: '取消行程',
      tone: 'muted',
      isCancel: true,
    },
  ]

  const noBatchOptions = [
    {
      id: 'adjacent',
      badge: '推荐',
      title: '相邻时段共享班次',
      mode: '14:20 集合 · 快捷衔接',
      arrive: '14:50',
      lifeTime: '3小时48分钟',
      lifeMinutes: 228,
      home: '20:50',
      feeDelta: 0,
      feeLabel: '¥0',
      activityOk: true,
      activityNote: '活动时长满足',
      returnOk: true,
      coinHint: false,
      cta: '选择相邻时段',
      tone: 'blue',
    },
    {
      id: 'otherHub',
      title: '切换其他汇聚枢纽',
      mode: '虹桥低空节点 · 增加约12分钟接驳',
      arrive: '14:55',
      lifeTime: '3小时42分钟',
      lifeMinutes: 222,
      home: '20:52',
      feeDelta: 8,
      feeLabel: '+¥8',
      activityOk: planType === 'time' ? 'partial' : true,
      activityNote: planType === 'time' ? '接近原活动保障目标' : '活动时长满足',
      returnOk: true,
      coinHint: planType === 'time',
      cta: '选择其他枢纽',
      tone: 'orange',
    },
    {
      id: 'existing',
      title: '合并到已有班次',
      mode: '13:45 已成班 · 稍早出发',
      arrive: '14:28',
      lifeTime: '3小时50分钟',
      lifeMinutes: 230,
      home: '20:45',
      feeDelta: 0,
      feeLabel: '¥0',
      activityOk: true,
      activityNote: '活动时长满足',
      returnOk: true,
      coinHint: false,
      cta: '选择已有班次',
      tone: 'green',
    },
    {
      id: 'ground',
      title: '切换纯地面方案',
      mode: '地铁 + 接驳',
      arrive: '15:05',
      lifeTime: '3小时28分钟',
      lifeMinutes: 208,
      home: '20:58',
      feeDelta: -refundAir + 48,
      feeLabel: `退低空差额后约 ¥${48}`,
      activityOk: 'partial',
      activityNote: '活动时间略减',
      returnOk: true,
      coinHint: true,
      cta: '选择纯地面',
      tone: 'muted',
    },
    {
      id: 'cancelBatch',
      title: '取消本次安排',
      mode: '结束本次行程',
      arrive: '-',
      lifeTime: '-',
      lifeMinutes: 0,
      home: '-',
      feeDelta: -(orderPrice - 28),
      feeLabel: `预计退款 ¥${orderPrice - 28}`,
      activityOk: false,
      activityNote: '按实际已执行服务结算',
      returnOk: false,
      coinHint: false,
      note: '如果你不希望调整，可以结束本次行程。',
      cta: '取消行程',
      tone: 'muted',
      isCancel: true,
    },
  ]

  const activityDelayOptions = [
    {
      id: 'delayKeep',
      badge: '推荐',
      title: '顺延活动并同步返程',
      mode: '展览推迟30分钟 · 返程顺延',
      arrive: '15:10',
      lifeTime: planType === 'time' ? '4小时05分钟' : '3小时50分钟',
      lifeMinutes: planType === 'time' ? 245 : 230,
      home: '20:55',
      feeDelta: 0,
      feeLabel: '¥0',
      activityOk: true,
      activityNote: '活动时长满足',
      returnOk: true,
      coinHint: false,
      cta: '选择同步调整',
      tone: 'blue',
    },
    {
      id: 'shorten',
      title: '缩短前端衔接，准时入场',
      mode: '压缩候乘缓冲 · 更紧凑衔接',
      arrive: '14:55',
      lifeTime: planType === 'relaxed' ? '3小时35分钟' : '3小时52分钟',
      lifeMinutes: planType === 'relaxed' ? 215 : 232,
      home: '20:48',
      feeDelta: 6,
      feeLabel: '+¥6',
      activityOk: true,
      activityNote: '活动时长满足',
      returnOk: true,
      coinHint: false,
      cta: '选择紧凑衔接',
      tone: 'orange',
    },
    {
      id: 'nearbyWait',
      title: '先附近停留，再入场',
      mode: '咖啡等候 → 原展览',
      arrive: '15:10',
      lifeTime: '3小时40分钟',
      lifeMinutes: 220,
      home: '20:50',
      feeDelta: 10,
      feeLabel: '+¥10',
      activityOk: planType === 'time' ? 'partial' : true,
      activityNote: planType === 'time' ? '略低于4小时目标' : '活动时长满足',
      returnOk: true,
      coinHint: planType === 'time',
      cta: '选择等候安排',
      tone: 'violet',
    },
    {
      id: 'cancelDelay',
      title: '取消本次安排',
      mode: '结束本次行程',
      arrive: '-',
      lifeTime: '-',
      lifeMinutes: 0,
      home: '-',
      feeDelta: -(orderPrice - 28),
      feeLabel: `预计退款 ¥${orderPrice - 28}`,
      activityOk: false,
      activityNote: '按规则结算',
      returnOk: false,
      coinHint: false,
      note: '如果你不希望继续等待，可以结束本次行程。',
      cta: '取消行程',
      tone: 'muted',
      isCancel: true,
    },
  ]

  return {
    weather: {
      id: 'weather',
      label: '天气变化 · 低空暂不可用',
      factTitle: '14:05 共享低空航段暂无法执行',
      reason:
        '目的地区域出现不适宜低空运行的天气条件，当前共享低空航段暂停。',
      impact:
        '原计划 14:35 左右抵达西岸区域。若不调整，将影响活动时间和后续返程安排。',
      safety:
        '低空服务暂停基于运行安全要求。天气条件恢复前不会继续执行该航段。',
      options: weatherOptions,
      compare: [
        { key: '到达/开始', a: '15:02', b: '14:48', c: '14:40' },
        { key: '生活时间', a: '3h36', b: '3h55', c: '4h05' },
        { key: '到家', a: '20:55', b: '20:45', c: '20:40' },
        { key: '活动保障', a: '部分满足', b: '满足', c: '满足' },
        { key: '返程保障', a: '满足', b: '满足', c: '满足' },
        { key: '费用变化', a: '+18', b: '-12', c: '-26' },
      ],
      compareHeads: ['原活动地面', '替代活动', '雨天路线'],
    },
    noBatch: {
      id: 'noBatch',
      label: '班次未成班',
      factTitle: '当前时段未达到成班要求',
      reason:
        '相近时间和方向的共享需求尚未满足成班条件，该时段共享班次暂未确认。',
      impact:
        '若继续等待而不调整，可能延误抵达活动地，并压缩后续生活时间。',
      safety:
        '平台不会在未满足成班与运行条件时强制组织班次。你可以改选相邻时段、其他枢纽或地面方案。',
      options: noBatchOptions,
      compare: [
        { key: '到达/开始', a: '14:50', b: '14:55', c: '14:28' },
        { key: '生活时间', a: '3h48', b: '3h42', c: '3h50' },
        { key: '到家', a: '20:50', b: '20:52', c: '20:45' },
        { key: '活动保障', a: '满足', b: '接近', c: '满足' },
        { key: '返程保障', a: '满足', b: '满足', c: '满足' },
        { key: '费用变化', a: '¥0', b: '+8', c: '¥0' },
      ],
      compareHeads: ['相邻时段', '其他枢纽', '已有班次'],
    },
    activityDelay: {
      id: 'activityDelay',
      label: '活动延迟',
      factTitle: '展览预约临时推迟 30 分钟',
      reason:
        '活动方通知入场时间顺延，原 14:40 开始的看展安排需要同步调整。',
      impact:
        '若不调整返程，仍有机会保住活动时长；但需要重新对齐开始时间与回家时间。',
      safety:
        '这是活动侧变化，不是低空运行安全问题。平台将优先围绕你的关键时间要求重排。',
      options: activityDelayOptions,
      compare: [
        { key: '开始', a: '15:10', b: '14:55', c: '15:10' },
        { key: '生活时间', a: planType === 'time' ? '4h05' : '3h50', b: '约3h50', c: '3h40' },
        { key: '到家', a: '20:55', b: '20:48', c: '20:50' },
        { key: '活动保障', a: '满足', b: '满足', c: planType === 'time' ? '部分' : '满足' },
        { key: '返程保障', a: '满足', b: '满足', c: '满足' },
        { key: '费用变化', a: '¥0', b: '+6', c: '+10' },
      ],
      compareHeads: ['同步顺延', '紧凑衔接', '附近等候'],
    },
    meta: {
      activityTarget,
      orderPrice,
      refundAir,
      usedLabel: '前端接驳部分',
    },
  }
}

export function resolveTripAdjustContext(locationState, searchParams) {
  const booking = resolveBookingSuccessContext(locationState, searchParams)
  const reason = resolveTripReason(searchParams?.get?.('reason'))
  const scenes = buildTripScenes(booking.planType)
  const scene = scenes[reason] || scenes.weather

  return {
    ...booking,
    reason,
    scene,
    meta: scenes.meta,
    activityTarget: scenes.meta.activityTarget,
  }
}
