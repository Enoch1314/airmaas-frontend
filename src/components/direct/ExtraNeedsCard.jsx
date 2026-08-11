import {
  Baby,
  Briefcase,
  ChevronDown,
  Accessibility,
  UsersRound,
  Wallet,
  CalendarClock,
  Share2,
} from 'lucide-react'

const specialOptions = [
  { id: 'child', label: '携带儿童', Icon: Baby },
  { id: 'elder', label: '携带长辈', Icon: UsersRound },
  { id: 'luggage', label: '行李', Icon: Briefcase },
  { id: 'access', label: '无障碍需求', Icon: Accessibility },
]

export default function ExtraNeedsCard({
  open,
  onToggle,
  returnTime,
  onReturnTimeChange,
  budget,
  onBudgetChange,
  acceptShare,
  onAcceptShareChange,
  specialNeeds,
  onToggleSpecial,
}) {
  return (
    <section className={`dp-extra${open ? ' is-open' : ''}`}>
      <button type="button" className="dp-extra__toggle" onClick={onToggle}>
        <span>补充需求</span>
        <span className="dp-extra__hint">返程 / 预算 / 同行偏好</span>
        <ChevronDown size={16} strokeWidth={2.2} className="dp-extra__chevron" />
      </button>

      {open ? (
        <div className="dp-extra__body">
          <label className="dp-row dp-row--input">
            <div className="dp-row__left">
              <CalendarClock size={16} strokeWidth={2.2} />
              <span>最晚返程时间</span>
            </div>
            <input
              className="dp-row__input"
              value={returnTime}
              onChange={(e) => onReturnTimeChange?.(e.target.value)}
            />
          </label>

          <label className="dp-row dp-row--input">
            <div className="dp-row__left">
              <Wallet size={16} strokeWidth={2.2} />
              <span>预算范围</span>
            </div>
            <input
              className="dp-row__input"
              value={budget}
              onChange={(e) => onBudgetChange?.(e.target.value)}
            />
          </label>

          <div className="dp-row">
            <div className="dp-row__left">
              <Share2 size={16} strokeWidth={2.2} />
              <span>是否接受共享拼班</span>
            </div>
            <div className="dp-segment">
              <button
                type="button"
                className={`dp-segment__btn${!acceptShare ? ' is-active' : ''}`}
                onClick={() => onAcceptShareChange?.(false)}
              >
                否
              </button>
              <button
                type="button"
                className={`dp-segment__btn${acceptShare ? ' is-active' : ''}`}
                onClick={() => onAcceptShareChange?.(true)}
              >
                是
              </button>
            </div>
          </div>

          <div className="dp-special">
            <p className="dp-special__label">同行与特殊需求</p>
            <div className="dp-special__chips">
              {specialOptions.map(({ id, label, Icon }) => {
                const active = specialNeeds.includes(id)
                return (
                  <button
                    key={id}
                    type="button"
                    className={`dp-chip${active ? ' is-active' : ''}`}
                    onClick={() => onToggleSpecial?.(id)}
                  >
                    <Icon size={14} strokeWidth={2.2} />
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
