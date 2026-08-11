import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Bookmark,
  Bot,
  Clock3,
  MapPin,
  Sparkles,
  Users,
  Wallet,
  Heart,
  Footprints,
  MessageCircleHeart,
  Undo2,
} from 'lucide-react'
import NeedFieldRow from '../components/need/NeedFieldRow'
import WeekendKeywords from '../components/need/WeekendKeywords'
import TimeCoreHint from '../components/need/TimeCoreHint'
import ReadyChecklist from '../components/need/ReadyChecklist'
import { needConfirmDefaults } from '../data/needConfirmData'
import { setPlanningMode } from '../data/planningModeData'
import { userProfile } from '../data/mockData'

function resolveInitial(state) {
  const base = { ...needConfirmDefaults }

  if (!state) return base

  if (state.source === 'smart-plan') {
    base.destination = ''
    if (state.returnLabel && state.returnLabel !== '不确定') {
      base.returnBefore = state.returnLabel.replace('前回家', '')
    }
    if (state.selectedTags?.length) {
      const mapped = state.selectedTags.filter((tag) =>
        ['轻松', '看展', '约会', '少换乘', '不想频繁换乘'].includes(tag),
      )
      if (mapped.length) {
        base.activities = mapped.filter((tag) =>
          ['看展', '约会', '演出'].includes(tag),
        )
        if (!base.activities.length) base.activities = ['看展', '约会']
      }
    }
  }

  if (state.source === 'direct-plan' || state.to) {
    base.destination = state.to || state.destination || '西岸美术馆'
    if (state.from) base.departure = state.from
  }

  return base
}

export default function NeedConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [need, setNeed] = useState(() => resolveInitial(location.state))

  useEffect(() => {
    setPlanningMode('ai')
  }, [])

  const subtitle = useMemo(
    () =>
      `${need.dayLabel}下午 · ${need.companions.split('·')[0].trim()}一起 · ${need.activities.join('')}`,
    [need],
  )

  const updateNeed = (key, value) => {
    setNeed((prev) => ({ ...prev, [key]: value }))
  }

  const generatingState = {
    source: 'need-confirm',
    planningMode: 'ai',
    ...need,
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page need-confirm-page">
        <header className="nc-hero">
          <div className="nc-hero__sky" aria-hidden="true" />
          <div className="nc-hero__skyline" aria-hidden="true" />

          <div className="nc-topbar">
            <button
              type="button"
              className="nc-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <div className="nc-topbar__right">
              <div className="nc-ai" aria-hidden="true">
                <Bot size={16} strokeWidth={2.2} />
              </div>
              <div className="nc-avatar" aria-hidden="true">
                {userProfile.avatarText}
              </div>
            </div>
          </div>

          <div className="nc-hero__copy">
            <h1>确认我的周末需求</h1>
            <p>看看我们理解得对不对，确认后再为你生成完整方案。</p>
          </div>
        </header>

        <section className="nc-main-card">
          <div className="nc-main-card__head">
            <Bookmark size={16} strokeWidth={2.3} />
            <div>
              <h2>我想拥有的周末</h2>
              <p>{subtitle}</p>
            </div>
          </div>

          <NeedFieldRow
            icon={Clock3}
            label="可用时间"
            value={`${need.dayLabel} ${need.availableTime}\n共 ${need.duration}`}
            editValue={need.availableTime}
            editable
            onSave={(value) => {
              const cleaned = String(value).trim()
              if (cleaned) updateNeed('availableTime', cleaned)
            }}
          />

          <NeedFieldRow
            icon={MapPin}
            label="从哪里出发"
            value={need.departure}
          />

          {need.destination ? (
            <NeedFieldRow
              icon={MapPin}
              label="已确定活动"
              value={need.destination}
            />
          ) : null}

          <NeedFieldRow icon={Users} label="同行" value={need.companions} />

          <NeedFieldRow
            icon={Wallet}
            label="预算"
            value={`约 ${need.budget} 元`}
            editValue={String(need.budget)}
            editable
            onSave={(value) => {
              const num = Number(String(value).replace(/[^\d]/g, ''))
              if (num) updateNeed('budget', num)
            }}
          />

          <NeedFieldRow
            icon={Heart}
            label="想做什么"
            value={need.activities.join(' / ')}
          />

          <NeedFieldRow
            icon={Footprints}
            label="节奏偏好"
            value={need.pace.join(' / ')}
            editValue={need.pace.join(' / ')}
            editable
            onSave={(value) => {
              const next = String(value)
                .split(/[\/、,\n]+/)
                .map((item) => item.trim())
                .filter(Boolean)
              if (next.length) updateNeed('pace', next)
            }}
          />

          <NeedFieldRow
            icon={MessageCircleHeart}
            label="互动偏好"
            value={`${need.social}\n不接受强社交`}
          />

          <NeedFieldRow
            icon={Undo2}
            label="返程要求"
            value={`${need.returnBefore} 前回家`}
            editValue={need.returnBefore}
            editable
            onSave={(value) => {
              const cleaned = String(value).replace('前回家', '').trim()
              if (cleaned) updateNeed('returnBefore', cleaned)
            }}
          />
        </section>

        <WeekendKeywords keywords={need.keywords} />
        <TimeCoreHint duration={need.duration} />
        <ReadyChecklist />
      </div>

      <div className="nc-bottom-bar">
        <button
          type="button"
          className="nc-primary-btn"
          onClick={() => navigate('/generating', { state: generatingState })}
        >
          <Sparkles size={16} strokeWidth={2.2} />
          确认，生成我的周末
        </button>
        <button
          type="button"
          className="nc-secondary-btn"
          onClick={() => navigate('/smart-plan')}
        >
          返回修改
        </button>
      </div>
    </div>
  )
}
