import { Settings } from 'lucide-react'

export default function ProfileHeader({ user, onSettings }) {
  return (
    <header className="pf-hero">
      <div className="pf-hero__sky" aria-hidden="true" />
      <div className="pf-topbar">
        <div className="pf-avatar" aria-hidden="true">
          {user.avatarText}
        </div>
        <button
          type="button"
          className="pf-icon-btn"
          aria-label="设置"
          onClick={onSettings}
        >
          <Settings size={16} strokeWidth={2.2} />
        </button>
      </div>
      <div className="pf-hero__copy">
        <h1>{user.nickname}</h1>
        <p className="pf-city">{user.city}</p>
        <p className="pf-status">
          这个月已经把 <b>{user.monthlyLifeLabel}</b> 还给生活
        </p>
      </div>
    </header>
  )
}
