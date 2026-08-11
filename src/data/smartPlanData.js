export const smartInputDefault = `我周六下午有6小时，
想和朋友轻松约会，
预算600元。`

export const smartQuickTags = [
  '轻松',
  '看展',
  '约会',
  '演出',
  '带父母',
  '亲子',
  '不想频繁换乘',
  '想看看夜景',
]

export const smartMockReply =
  '明白了，我先帮你整理一下这个周末。'

export const smartUnderstoodDefaults = [
  { id: 'time', label: '周六 14:00—20:00', group: '时间' },
  { id: 'companions', label: '朋友同行', group: '同行' },
  { id: 'people', label: '2人', group: '同行' },
  { id: 'budget', label: '预算 600 元', group: '预算' },
  { id: 'relax', label: '轻松', group: '体验' },
  { id: 'date', label: '约会', group: '体验' },
  { id: 'exhibit', label: '看展', group: '体验' },
  { id: 'transfer', label: '少换乘', group: '节奏' },
  { id: 'social', label: '不接受强社交', group: '社交' },
]

export const smartNeedRows = [
  { key: '时间', value: '周六 14:00—20:00' },
  { key: '同行', value: '朋友 · 2人' },
  { key: '预算', value: '约600元' },
  { key: '体验', value: '轻松 / 约会 / 看展' },
  { key: '节奏', value: '不频繁换乘' },
  { key: '社交', value: '不接受强社交' },
  { key: '返程', value: '20:00前开始返程' },
]

export const returnTimeOptions = ['20:30', '21:00', '21:30', '不确定']

export const weekendSummaryDefault = {
  lines: [
    '周六下午',
    '和朋友轻松看展',
    '预算约600元',
    '少换乘',
    '21:00前回家',
  ],
  highlight: '不是先决定去哪，而是先决定这6小时想怎么过。',
}
