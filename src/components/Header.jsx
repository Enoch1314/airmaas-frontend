import { Bell, ChevronDown, Info, Sun } from 'lucide-react'
import { userProfile } from '../data/mockData'

export default function Header({ onMessage, onProfile }) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="header-brand">
          <span className="brand">AirMaaS</span>
          <button type="button" className="city-chip" aria-label="选择城市">
            {userProfile.city}
            <ChevronDown size={13} strokeWidth={2.4} />
          </button>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label="消息"
            onClick={onMessage}
          >
            <Bell size={17} strokeWidth={2.1} />
            <span className="notify-dot" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="avatar-btn"
            aria-label="用户"
            onClick={onProfile}
          >
            {userProfile.avatarText}
          </button>
        </div>
      </div>

      <div className="weather-row">
        <Sun size={14} strokeWidth={2.2} className="weather-icon" />
        <span className="weather-text">{userProfile.weather}</span>
        <span className="weather-sep">｜</span>
        <span className="weather-hint">{userProfile.weatherHint}</span>
        <Info size={12} strokeWidth={2.2} className="weather-info" />
      </div>
    </header>
  )
}
