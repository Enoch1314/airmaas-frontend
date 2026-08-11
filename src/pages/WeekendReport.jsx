import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ReportCover from '../components/report/ReportCover'
import ReportLifeHighlight from '../components/report/ReportLifeHighlight'
import MemoryRoute from '../components/report/MemoryRoute'
import PlanActualCompare from '../components/report/PlanActualCompare'
import LifeStamps from '../components/report/LifeStamps'
import PhotoStrip from '../components/report/PhotoStrip'
import OneSentence from '../components/report/OneSentence'
import ReportBankCard from '../components/report/ReportBankCard'
import SharePrivacy from '../components/report/SharePrivacy'
import ShareCardModal from '../components/report/ShareCardModal'
import ReplicaBlock from '../components/report/ReplicaBlock'
import {
  buildReplicaState,
  defaultPrivacy,
  markWeekendMemorySaved,
  resolveWeekendReportContext,
  saveWeekendFeedback,
} from '../data/weekendReportData'

const DEMO_MODES = [
  { id: 'private', label: '私密记忆' },
  { id: 'share', label: '分享脱敏' },
]

export default function WeekendReport() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const ctx = useMemo(
    () => resolveWeekendReportContext(location.state, searchParams),
    [location.state, searchParams],
  )
  const demoMode = searchParams.get('demo') === '1'

  const [note, setNote] = useState(ctx.feedback.userNote)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(ctx.feedback.userNote)
  const [visibility, setVisibility] = useState(
    ctx.shareMode ? 'public' : 'self',
  )
  const [privacy, setPrivacy] = useState(defaultPrivacy)
  const [shareOpen, setShareOpen] = useState(false)
  const [replicaOpen, setReplicaOpen] = useState(false)
  const [saved, setSaved] = useState(ctx.saved)
  const [toast, setToast] = useState('')

  useEffect(() => {
    setNote(ctx.feedback.userNote)
    setDraft(ctx.feedback.userNote)
    setVisibility(ctx.shareMode ? 'public' : 'self')
    if (ctx.shareMode) {
      setPrivacy({
        hideOrigin: true,
        hideTrack: true,
        hideCompanions: true,
        hideFee: true,
      })
    }
  }, [ctx.feedback.userNote, ctx.shareMode, ctx.choiceId])

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const switchMode = (mode) => {
    const next = new URLSearchParams(searchParams)
    next.set('mode', mode)
    if (!next.get('type')) next.set('type', ctx.planType)
    setSearchParams(next, { replace: true })
  }

  const togglePrivacy = (key) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const saveNote = () => {
    const next = draft.trim() || '今天终于没有把大半天花在路上。'
    setNote(next)
    setEditing(false)
    saveWeekendFeedback({
      ...ctx.feedback,
      userNote: next,
    })
  }

  const handleSaveMemory = () => {
    markWeekendMemorySaved()
    setSaved(true)
    showToast('已保存到周末记忆')
  }

  const handleReplica = (variant) => {
    navigate('/smart-plan', { state: buildReplicaState(ctx, variant) })
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page weekend-report-page">
        <header className="wr-hero">
          <div className="wr-hero__sky" aria-hidden="true" />
          <div className="wr-topbar">
            <button
              type="button"
              className="wr-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
          </div>
          <div className="wr-hero__copy">
            <div className="wr-status">记忆航线已生成</div>
            <h1>我的周末报告</h1>
            <p>把今天真正属于生活的部分保存下来。</p>
          </div>
        </header>

        <ReportCover cover={ctx.cover} />
        <ReportLifeHighlight result={ctx.finalTripResult} bank={ctx.bank} />
        <MemoryRoute nodes={ctx.memoryRoute} />
        <PlanActualCompare
          compare={ctx.compare}
          lifeLabel={ctx.finalTripResult.actualLifeLabel}
        />
        <LifeStamps stamps={ctx.stamps} />
        <PhotoStrip
          photos={ctx.photos}
          skyNote={ctx.skyNote}
          onAdd={() => showToast('照片上传为原型演示')}
        />
        <OneSentence
          note={note}
          editing={editing}
          draft={draft}
          onEdit={() => {
            setDraft(note)
            setEditing(true)
          }}
          onChange={setDraft}
          onSave={saveNote}
          onCancel={() => setEditing(false)}
        />
        <ReportBankCard
          bank={ctx.bank}
          onOpen={() => navigate('/time-bank', { state: ctx })}
        />
        <SharePrivacy
          visibility={visibility}
          privacy={privacy}
          onVisibility={setVisibility}
          onTogglePrivacy={togglePrivacy}
        />

        <section className="wr-actions">
          <button
            type="button"
            className="wr-secondary"
            onClick={() => setShareOpen(true)}
          >
            生成周末分享卡
          </button>
        </section>

        <ReplicaBlock
          replica={ctx.replica}
          open={replicaOpen}
          onToggle={() => setReplicaOpen((v) => !v)}
          onPick={handleReplica}
          onInvite={() => showToast('已生成脱敏周末邀请卡（原型演示）')}
        />

        <section className="wr-save">
          {saved ? (
            <div className="wr-save__done">
              <strong>✓ 已保存到周末记忆</strong>
              <button
                type="button"
                className="wr-secondary"
                onClick={() => navigate('/profile')}
              >
                查看我的周末记忆
              </button>
            </div>
          ) : (
            <button type="button" className="wr-primary" onClick={handleSaveMemory}>
              保存到我的周末记忆
            </button>
          )}
        </section>

        {demoMode ? (
        <div className="wr-demo">
          <span>演示可见模式</span>
          <div>
            {DEMO_MODES.map((item) => (
              <button
                type="button"
                key={item.id}
                className={ctx.mode === item.id ? 'is-on' : ''}
                onClick={() => switchMode(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        ) : null}
      </div>

      <ShareCardModal
        open={shareOpen}
        cover={ctx.cover}
        result={ctx.finalTripResult}
        note={note}
        onClose={() => setShareOpen(false)}
        onToast={showToast}
      />

      <div className={`toast wr-toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
