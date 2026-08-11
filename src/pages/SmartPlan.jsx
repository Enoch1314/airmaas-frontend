import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Bot, Sparkles } from 'lucide-react'
import SmartWelcome from '../components/smart/SmartWelcome'
import SmartQuickTags from '../components/smart/SmartQuickTags'
import SmartInput from '../components/smart/SmartInput'
import UnderstoodNeeds from '../components/smart/UnderstoodNeeds'
import FollowUpReturn from '../components/smart/FollowUpReturn'
import WeekendSummaryCard from '../components/smart/WeekendSummaryCard'
import {
  smartInputDefault,
  smartMockReply,
  smartUnderstoodDefaults,
} from '../data/smartPlanData'
import { setPlanningMode } from '../data/planningModeData'
import { userProfile } from '../data/mockData'

function buildPrefill(state) {
  if (!state?.from && !state?.to) return smartInputDefault
  const parts = [
    state.from ? `从${state.from}出发` : '',
    state.to ? `想去${state.to}` : '',
    state.timeValue || '',
    state.companions ? `${state.companions}人同行` : '',
    state.budget ? `预算${state.budget}` : '',
  ].filter(Boolean)
  return parts.join('，') || smartInputDefault
}

export default function SmartPlan() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setPlanningMode('ai')
  }, [])

  const [phase, setPhase] = useState('input')
  const [text, setText] = useState(() => buildPrefill(location.state))
  const [selectedTags, setSelectedTags] = useState(['轻松', '约会'])
  const [conditions, setConditions] = useState(smartUnderstoodDefaults)
  const [returnAnswered, setReturnAnswered] = useState(false)
  const [returnLabel, setReturnLabel] = useState('')
  const [toast, setToast] = useState('')

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const confirmState = useMemo(
    () => ({
      source: 'smart-plan',
      planningMode: 'ai',
      text,
      selectedTags,
      conditions,
      returnLabel,
    }),
    [text, selectedTags, conditions, returnLabel],
  )

  const handleSend = () => {
    if (!text.trim()) return
    setPhase('understood')
    setConditions(smartUnderstoodDefaults)
    setReturnAnswered(false)
    setReturnLabel('')
  }

  const handleReset = () => {
    setPhase('input')
    setText(smartInputDefault)
    setSelectedTags(['轻松', '约会'])
    setConditions(smartUnderstoodDefaults)
    setReturnAnswered(false)
    setReturnLabel('')
  }

  const handleReturnSelect = (option) => {
    setReturnAnswered(true)
    setReturnLabel(option)
    setConditions((prev) => {
      const withoutReturn = prev.filter((item) => item.id !== 'returnHome')
      return [
        ...withoutReturn,
        {
          id: 'returnHome',
          label: option === '不确定' ? '返程时间灵活' : `${option}前回家`,
          group: '返程',
        },
      ]
    })
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page smart-plan-page">
        <header className="sp-hero">
          <div className="sp-hero__sky" aria-hidden="true" />
          <div className="sp-hero__skyline" aria-hidden="true" />

          <div className="sp-topbar">
            <button
              type="button"
              className="sp-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <div className="sp-topbar__right">
              <div className="sp-topbar__ai" aria-hidden="true">
                <Bot size={16} strokeWidth={2.2} />
              </div>
              <div className="sp-avatar" aria-hidden="true">
                {userProfile.avatarText}
              </div>
            </div>
          </div>

          <div className="sp-hero__copy">
            <h1>帮我设计周末</h1>
            <p>告诉我你有多少时间、和谁一起、想要什么感觉。</p>
          </div>
        </header>

        {phase === 'input' ? (
          <>
            <SmartWelcome />
            <SmartQuickTags
              selected={selectedTags}
              onToggle={(tag) => {
                setSelectedTags((prev) =>
                  prev.includes(tag)
                    ? prev.filter((item) => item !== tag)
                    : [...prev, tag],
                )
              }}
            />
            <SmartInput
              value={text}
              onChange={setText}
              onSend={handleSend}
              onVoice={() => showToast('语音输入将在下一阶段接入')}
              onImage={() => showToast('活动海报识别将在下一阶段接入')}
            />
          </>
        ) : (
          <>
            <section className="sp-chat">
              <div className="sp-chat__bubble sp-chat__bubble--user">
                <p>{text}</p>
              </div>
              <div className="sp-chat__row">
                <div className="sp-chat__bot" aria-hidden="true">
                  <Bot size={16} strokeWidth={2.2} />
                </div>
                <div className="sp-chat__bubble sp-chat__bubble--ai">
                  <p>{smartMockReply}</p>
                </div>
              </div>
            </section>

            <UnderstoodNeeds
              conditions={conditions}
              onRemove={(id) =>
                setConditions((prev) => prev.filter((item) => item.id !== id))
              }
            />

            <FollowUpReturn
              answered={returnAnswered}
              onSelect={handleReturnSelect}
            />

            <WeekendSummaryCard returnLabel={returnLabel} />

            <div className="sp-actions">
              <button
                type="button"
                className="sp-confirm-btn"
                onClick={() => navigate('/need-confirm', { state: confirmState })}
              >
                <Sparkles size={16} strokeWidth={2.2} />
                确认需求，生成我的周末
              </button>
              <button
                type="button"
                className="sp-reset-btn"
                onClick={handleReset}
              >
                重新描述
              </button>
            </div>
          </>
        )}
      </div>

      <div className={`toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
