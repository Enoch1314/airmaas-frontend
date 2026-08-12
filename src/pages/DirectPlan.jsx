import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Bot,
  CalendarDays,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react'
import LocationField from '../components/direct/LocationField'
import TimeModeSelector from '../components/direct/TimeModeSelector'
import CompanionCounter from '../components/direct/CompanionCounter'
import ExtraNeedsCard from '../components/direct/ExtraNeedsCard'
import GuaranteeHint from '../components/direct/GuaranteeHint'
import PrimaryButton from '../components/direct/PrimaryButton'
import { directPlanFormDefaults, userProfile } from '../data/mockData'
import {
  saveDirectPlanSnapshot,
  setPlanningMode,
} from '../data/planningModeData'
import PageHeroBackdrop from '../components/PageHeroBackdrop'
import { pageHeroPhoto } from '../data/heroBgData'

export default function DirectPlan() {
  const navigate = useNavigate()

  useEffect(() => {
    setPlanningMode('direct')
  }, [])

  const [from, setFrom] = useState(directPlanFormDefaults.from)
  const [to, setTo] = useState(directPlanFormDefaults.to)
  const [timeMode, setTimeMode] = useState(directPlanFormDefaults.timeMode)
  const [timeValue, setTimeValue] = useState(directPlanFormDefaults.timeValue)
  const [companions, setCompanions] = useState(directPlanFormDefaults.companions)
  const [extraOpen, setExtraOpen] = useState(false)
  const [returnTime, setReturnTime] = useState(directPlanFormDefaults.returnTime)
  const [budget, setBudget] = useState(directPlanFormDefaults.budget)
  const [acceptShare, setAcceptShare] = useState(
    directPlanFormDefaults.acceptShare,
  )
  const [specialNeeds, setSpecialNeeds] = useState(
    directPlanFormDefaults.specialNeeds,
  )

  const formState = useMemo(
    () => ({
      from,
      to,
      timeMode,
      timeValue,
      companions,
      returnTime,
      budget,
      acceptShare,
      specialNeeds,
      source: 'direct-plan',
      planningMode: 'direct',
      destination: to || '西岸美术馆',
      activity: `${to || '西岸美术馆'}看展`,
    }),
    [
      from,
      to,
      timeMode,
      timeValue,
      companions,
      returnTime,
      budget,
      acceptShare,
      specialNeeds,
    ],
  )

  const timeLabel = timeMode === 'depart' ? '出发时间' : '到达时间'

  const toggleSpecial = (id) => {
    setSpecialNeeds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const goGenerate = () => {
    setPlanningMode('direct')
    saveDirectPlanSnapshot(formState)
    navigate('/generating', { state: formState })
  }

  const goAiSupplement = () => {
    setPlanningMode('ai')
    navigate('/smart-plan', {
      state: { ...formState, planningMode: 'ai', source: 'direct-plan' },
    })
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page direct-plan-page">
        <header className="dp-hero">
          <PageHeroBackdrop src={pageHeroPhoto.directPlan} />

          <div className="dp-topbar">
            <button
              type="button"
              className="dp-icon-btn"
              aria-label="返回首页"
              onClick={() => navigate('/home')}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <div className="dp-avatar" aria-hidden="true">
              {userProfile.avatarText}
            </div>
          </div>

          <div className="dp-hero__copy">
            <h1>直接规划</h1>
            <p>告诉我们你要去哪，剩下的交给 AirMaaS。</p>
          </div>
        </header>

        <section className="dp-card">
          <LocationField
            variant="from"
            label="从哪里出发"
            value={from}
            onChange={setFrom}
            placeholder="青浦汇聚点附近"
            hint="支持定位 / 历史地点"
          />

          <LocationField
            variant="to"
            label="想去哪里"
            value={to}
            onChange={setTo}
            placeholder="西岸美术馆"
            hint="活动搜索 / 地图选择"
          />

          <div className="dp-block">
            <p className="dp-block__label">时间方式</p>
            <TimeModeSelector value={timeMode} onChange={setTimeMode} />
          </div>

          <label className="dp-row dp-row--input">
            <div className="dp-row__left">
              <CalendarDays size={16} strokeWidth={2.2} />
              <span>{timeLabel}</span>
            </div>
            <input
              className="dp-row__input"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
            />
          </label>

          <CompanionCounter value={companions} onChange={setCompanions} />

          <ExtraNeedsCard
            open={extraOpen}
            onToggle={() => setExtraOpen((v) => !v)}
            returnTime={returnTime}
            onReturnTimeChange={setReturnTime}
            budget={budget}
            onBudgetChange={setBudget}
            acceptShare={acceptShare}
            onAcceptShareChange={setAcceptShare}
            specialNeeds={specialNeeds}
            onToggleSpecial={toggleSpecial}
          />

          {timeMode === 'arrive' ? <GuaranteeHint /> : null}
        </section>

        <section className="dp-ai-entry">
          <p>还想让我们一起安排活动和返程？</p>
          <button
            type="button"
            className="dp-ai-btn"
            onClick={goAiSupplement}
          >
            <Bot size={16} strokeWidth={2.2} />
            交给 AI 补充周末安排
            <span className="dp-ai-tag">AI</span>
          </button>
        </section>

        <section className="dp-tips">
          <div className="dp-tips__title">
            <Lightbulb size={15} strokeWidth={2.2} />
            智能小贴士
          </div>
          <ul>
            <li>
              <CheckCircle2 size={14} strokeWidth={2.2} />
              选择「必须几点前到达」可添加到达保障
            </li>
            <li>
              <CheckCircle2 size={14} strokeWidth={2.2} />
              补充儿童 / 长辈需求，会优先推荐更轻松方案
            </li>
            <li>
              <CheckCircle2 size={14} strokeWidth={2.2} />
              目的地也可填写展览、乐园、演出等活动名称
            </li>
          </ul>
        </section>
      </div>

      <div className="dp-bottom-bar">
        <PrimaryButton onClick={goGenerate}>生成周末方案</PrimaryButton>
      </div>
    </div>
  )
}
