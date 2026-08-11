import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileStats from '../components/profile/ProfileStats'
import MemoryList from '../components/profile/MemoryList'
import CompanionList from '../components/profile/CompanionList'
import InterestEditor from '../components/profile/InterestEditor'
import TravelRhythm from '../components/profile/TravelRhythm'
import AccessibilitySettings from '../components/profile/AccessibilitySettings'
import ProfileBenefits from '../components/profile/ProfileBenefits'
import CollectionCard from '../components/profile/CollectionCard'
import PrivacyBlock from '../components/profile/PrivacyBlock'
import AuthSwitches from '../components/profile/AuthSwitches'
import AiExplain from '../components/profile/AiExplain'
import ProfileSettings from '../components/profile/ProfileSettings'
import InstallHint from '../components/profile/InstallHint'
import SimpleSheet from '../components/profile/SimpleSheet'
import {
  resolveProfileContext,
  saveProfilePrefs,
} from '../data/profileData'

export default function Profile() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const base = useMemo(
    () => resolveProfileContext(location.state, searchParams),
    [location.state, searchParams],
  )

  const [interests, setInterests] = useState(base.interests)
  const [editingInterest, setEditingInterest] = useState(false)
  const [interaction, setInteraction] = useState(base.interaction)
  const [accessibility, setAccessibility] = useState(base.accessibility)
  const [auth, setAuth] = useState(base.auth)
  const [sheet, setSheet] = useState(null)
  const [toast, setToast] = useState('')

  const persist = (patch) => {
    saveProfilePrefs({
      interests,
      interaction,
      accessibility,
      auth,
      ...patch,
    })
  }

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const toggleInterest = (id) => {
    setInterests((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
      persist({ interests: next })
      return next
    })
  }

  const toggleA11y = (id) => {
    setAccessibility((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
      persist({ accessibility: next })
      return next
    })
  }

  const toggleAuth = (key) => {
    setAuth((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      persist({ auth: next })
      return next
    })
  }

  const handleMemory = (item) => {
    if (item.action === 'view') {
      navigate('/weekend-report', { state: location.state })
      return
    }
    navigate('/smart-plan', {
      state: { fromMemoryRoute: true, sourceTitle: item.title },
    })
  }

  return (
    <div className="phone-shell phone-shell--subpage phone-shell--profile">
      <div className="app-page profile-page">
        <ProfileHeader
          user={base.user}
          onSettings={() => setSheet('settings')}
        />

        <ProfileStats
          stats={base.stats}
          onOpenBank={() => navigate('/time-bank')}
        />

        <MemoryList
          items={base.memories}
          onAction={handleMemory}
          onViewAll={() => setSheet('memories')}
        />

        <CompanionList
          items={base.companions}
          onManage={() => setSheet('companions')}
        />

        <InterestEditor
          selected={interests}
          editing={editingInterest}
          onToggle={toggleInterest}
          onEdit={() => setEditingInterest((v) => !v)}
        />

        <TravelRhythm
          pace={base.pace}
          interaction={interaction}
          lowAir={base.lowAir}
          services={base.services}
          onInteraction={(id) => {
            setInteraction(id)
            persist({ interaction: id })
          }}
        />

        <AccessibilitySettings
          selected={accessibility}
          onToggle={toggleA11y}
        />

        <ProfileBenefits
          items={base.ownedBenefits}
          onOpen={() => navigate('/time-bank')}
        />

        <CollectionCard
          collection={base.collection}
          onView={() => showToast('收藏列表将在后续完善（原型演示）')}
          onStart={() => navigate('/smart-plan')}
        />

        <PrivacyBlock
          items={base.privacyItems}
          onOpen={() => setSheet('privacy')}
        />

        <AuthSwitches auth={auth} onToggle={toggleAuth} />
        <AiExplain />

        <ProfileSettings
          items={base.settingLinks}
          onClick={(item) => {
            if (item.id === 'logout') {
              showToast('已退出登录（原型演示）')
              return
            }
            showToast(`${item.label}（原型演示）`)
          }}
        />

        <InstallHint />
      </div>

      <BottomNav />

      <SimpleSheet
        open={sheet === 'companions'}
        title="管理同行人"
        onClose={() => setSheet(null)}
      >
        <ul className="pf-sheet-list">
          {base.companions.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </li>
          ))}
        </ul>
        <p className="pf-sheet-note">不会展示真实手机号等敏感信息。</p>
      </SimpleSheet>

      <SimpleSheet
        open={sheet === 'memories'}
        title="全部周末记忆"
        onClose={() => setSheet(null)}
      >
        <ul className="pf-sheet-list">
          {base.memories.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <span>
                {item.date} · {item.lifeLabel}
              </span>
            </li>
          ))}
          <li>
            <strong>更多记忆</strong>
            <span>后续周末将继续沉淀在这里</span>
          </li>
        </ul>
      </SimpleSheet>

      <SimpleSheet
        open={sheet === 'privacy'}
        title="隐私设置"
        onClose={() => setSheet(null)}
      >
        <ul className="pf-sheet-list">
          {base.privacyItems.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
            </li>
          ))}
        </ul>
      </SimpleSheet>

      <SimpleSheet
        open={sheet === 'settings'}
        title="设置"
        onClose={() => setSheet(null)}
      >
        <ul className="pf-sheet-list">
          {base.settingLinks.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="pf-sheet-btn"
                onClick={() => {
                  setSheet(null)
                  showToast(`${item.label}（原型演示）`)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </SimpleSheet>

      <div className={`toast pf-toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
