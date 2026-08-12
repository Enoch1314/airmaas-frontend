import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import LifeResultCard from '../components/result/LifeResultCard'
import PromiseCompare from '../components/result/PromiseCompare'
import SettlementCard from '../components/result/SettlementCard'
import TimeBankResultCard from '../components/result/TimeBankResultCard'
import WeekendSummary from '../components/result/WeekendSummary'
import FeedbackBlock from '../components/result/FeedbackBlock'
import ReportEntryCard from '../components/result/ReportEntryCard'
import { resolveTripResultContext } from '../data/tripResultData'
import { saveWeekendFeedback } from '../data/weekendReportData'
import PageHeroBackdrop from '../components/PageHeroBackdrop'
import { pageHeroPhoto } from '../data/heroBgData'

const DEMO_RESULTS = [
  { id: 'fulfilled', label: '全部完成' },
  { id: 'partial', label: '部分未完成' },
]

export default function TripResult() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [rating, setRating] = useState(5)
  const [tags, setTags] = useState(['easy', 'pace'])
  const [note, setNote] = useState('')
  const [toast, setToast] = useState('')

  const ctx = useMemo(
    () => resolveTripResultContext(location.state, searchParams),
    [location.state, searchParams],
  )
  const demoMode = searchParams.get('demo') === '1'

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const toggleTag = (id) => {
    setTags((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const switchResult = (result) => {
    const next = new URLSearchParams(searchParams)
    next.set('result', result)
    if (!next.get('type')) next.set('type', ctx.planType)
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page trip-result-page">
        <header className="tr-hero">
          <PageHeroBackdrop src={pageHeroPhoto.tripResult} />

          <div className="tr-topbar">
            <button
              type="button"
              className="tr-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <button
              type="button"
              className="tr-icon-btn"
              aria-label="首页"
              onClick={() => navigate('/home')}
            >
              <Home size={16} strokeWidth={2.2} />
            </button>
          </div>

          <div className="tr-hero__copy">
            <div className="tr-status">行程已完成</div>
            <h1>这个周末完成了</h1>
            <p>一起看看，今天有多少时间真正留给了生活。</p>
          </div>
        </header>

        <LifeResultCard result={ctx.finalTripResult} />
        <PromiseCompare items={ctx.guaranteesCompare} />
        <SettlementCard
          result={ctx.finalTripResult}
          activityTarget={ctx.activityTarget}
        />
        <TimeBankResultCard
          bank={ctx.bank}
          onOpen={() => navigate('/time-bank', { state: ctx })}
        />
        <WeekendSummary summary={ctx.summary} />
        <FeedbackBlock
          rating={rating}
          tags={tags}
          note={note}
          onRate={setRating}
          onToggleTag={toggleTag}
          onNote={setNote}
        />
        <ReportEntryCard
          onGenerate={() => {
            const feedback = {
              rating,
              tags,
              userNote: note.trim() || '今天终于没有把大半天花在路上。',
            }
            saveWeekendFeedback(feedback)
            navigate('/weekend-report', {
              state: { ...ctx, ...feedback },
            })
          }}
        />

        <section className="tr-again">
          <button
            type="button"
            className="tr-secondary"
            onClick={() => showToast('已保存为可复刻周末方案')}
          >
            再来一次
          </button>
          <button
            type="button"
            className="tr-secondary"
            onClick={() => showToast('邀请已发送给朋友（原型演示）')}
          >
            邀请朋友下次一起
          </button>
        </section>

        {demoMode ? (
        <div className="tr-demo">
          <span>演示保障结果</span>
          <div>
            {DEMO_RESULTS.map((item) => (
              <button
                type="button"
                key={item.id}
                className={ctx.resultMode === item.id ? 'is-on' : ''}
                onClick={() => switchResult(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        ) : null}
      </div>

      <div className={`toast tr-toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
