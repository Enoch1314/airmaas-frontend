import { resolveWeekendReportContext } from './weekendReportData'

export const TIME_BANK_COINS_KEY = 'airmaas_time_bank_coins'
export const TIME_BANK_OWNED_KEY = 'airmaas_time_bank_owned'

export const timeBankBase = {
  totalRecoveredMinutes: 248,
  monthlyRecoveredMinutes: 142,
  completedGuarantees: 8,
  timeCoins: 126,
}

export function minutesToLabel(total) {
  const h = Math.floor(total / 60)
  const m = total % 60
  if (m === 0) return `${h}小时`
  return `${h}小时${String(m).padStart(2, '0')}分钟`
}

export const monthlyRecords = [
  { id: 'm1', date: '06.08', title: '看展', minutes: 42 },
  { id: 'm2', date: '06.15', title: '朋友聚会', minutes: 35 },
  { id: 'm3', date: '06.24', title: '雨天西岸', minutes: 37 },
  { id: 'm4', date: '06.30', title: '亲子活动', minutes: 28 },
]

export const guaranteeHistory = [
  {
    id: 'g1',
    title: '西岸雨天周末',
    items: [
      {
        name: '活动时长保障',
        target: '至少3小时45分钟',
        actual: '4小时05分钟',
        ok: true,
      },
      {
        name: '返程保障',
        target: '21:00前',
        actual: '20:40',
        ok: true,
      },
    ],
  },
  {
    id: 'g2',
    title: '演唱会冲场',
    items: [
      {
        name: '到达保障',
        target: '19:00前抵达',
        actual: '18:52',
        ok: true,
      },
      {
        name: '返程保障',
        target: '23:30前',
        actual: '23:22',
        ok: true,
      },
    ],
  },
  {
    id: 'g3',
    title: '周末看展',
    items: [
      {
        name: '活动时长保障',
        target: '至少3小时',
        actual: '2小时51分钟',
        ok: false,
        gap: '9分钟',
        coin: 30,
      },
    ],
  },
]

export const redeemCatalog = [
  {
    id: 'priority',
    title: '优先匹配权益',
    cost: 30,
    desc: '在共享班次匹配中获得平台服务优先级。',
    note: '不改变航空运行、安全或空域规则。',
  },
  {
    id: 'adjacent',
    title: '相邻班次免费调整',
    cost: 40,
    desc: '一次相邻时段班次调整权益。',
  },
  {
    id: 'skywalk',
    title: '天空散步体验权益',
    cost: 60,
    desc: '抵扣部分天空散步航线服务权益。',
  },
  {
    id: 'friend',
    title: '好友同行权益',
    cost: 50,
    desc: '为同行好友抵扣部分平台服务费用。',
  },
]

export const defaultOwnedBenefits = [
  {
    id: 'owned-priority',
    catalogId: 'priority',
    title: '优先匹配权益',
    count: 1,
    expire: '2026-09-30',
  },
  {
    id: 'owned-adjacent',
    catalogId: 'adjacent',
    title: '相邻班次调整',
    count: 1,
    expire: '2026-08-31',
  },
]

export const defaultCoinLedger = [
  {
    id: 'c1',
    date: '06.24',
    title: '时间保障全部完成',
    delta: 0,
  },
  {
    id: 'c2',
    date: '06.18',
    title: '活动时长保障未完全完成',
    delta: 30,
  },
  {
    id: 'c3',
    date: '06.12',
    title: '使用相邻班次调整权益',
    delta: -40,
  },
  {
    id: 'c4',
    date: '06.05',
    title: '好友同行活动奖励',
    delta: 20,
  },
]

function readJson(key, fallback) {
  try {
    const raw = window.sessionStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function readTimeCoins() {
  const stored = readJson(TIME_BANK_COINS_KEY, null)
  if (typeof stored === 'number') return stored
  return timeBankBase.timeCoins
}

export function writeTimeCoins(value) {
  window.sessionStorage.setItem(TIME_BANK_COINS_KEY, JSON.stringify(value))
}

export function readOwnedBenefits() {
  return readJson(TIME_BANK_OWNED_KEY, defaultOwnedBenefits)
}

export function writeOwnedBenefits(list) {
  window.sessionStorage.setItem(TIME_BANK_OWNED_KEY, JSON.stringify(list))
}

export function resolveTimeBankContext(locationState = {}, searchParams) {
  const report = resolveWeekendReportContext(locationState, searchParams)
  const result = report.finalTripResult
  const coins = readTimeCoins()
  const owned = readOwnedBenefits()

  const maxMonth = Math.max(...monthlyRecords.map((item) => item.minutes), 1)

  return {
    ...timeBankBase,
    timeCoins: coins,
    totalRecoveredLabel: minutesToLabel(timeBankBase.totalRecoveredMinutes),
    monthlyRecoveredLabel: minutesToLabel(timeBankBase.monthlyRecoveredMinutes),
    monthlyRecords: monthlyRecords.map((item) => ({
      ...item,
      bar: Math.round((item.minutes / maxMonth) * 100),
    })),
    recent: {
      title: report.cover?.title || '雨天西岸 · 慢下来的一天',
      recoveredLabel: `+${result.recoveredTime}分钟`,
      recoveredMinutes: result.recoveredTime,
      guaranteeScore: report.bank.guaranteeScore,
      timeCoins: result.timeCoinReward,
      homeTime: result.actualHomeTime,
    },
    guaranteeHistory,
    redeemCatalog,
    ownedBenefits: owned,
    coinLedger: defaultCoinLedger,
    distinguish: {
      life: '生活时间 = 这次周末真正多留出的时间',
      coin: '时间币 = 平台内部可兑换服务权益',
      note: '两者没有固定兑换关系，不按分钟折算时间币。',
    },
    report,
  }
}

export function redeemBenefit(catalogId) {
  const item = redeemCatalog.find((entry) => entry.id === catalogId)
  if (!item) return { ok: false, message: '权益不存在' }

  const coins = readTimeCoins()
  if (coins < item.cost) {
    return { ok: false, message: '时间币不足' }
  }

  const nextCoins = coins - item.cost
  writeTimeCoins(nextCoins)

  const owned = [...readOwnedBenefits()]
  const existing = owned.find((entry) => entry.catalogId === catalogId)
  if (existing) {
    existing.count += 1
  } else {
    owned.unshift({
      id: `owned-${catalogId}-${Date.now()}`,
      catalogId,
      title: item.title,
      count: 1,
      expire: '2026-12-31',
    })
  }
  writeOwnedBenefits(owned)

  return {
    ok: true,
    message: '兑换成功',
    coins: nextCoins,
    owned,
    item,
  }
}
