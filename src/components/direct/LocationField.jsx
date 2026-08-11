import { ChevronRight, LocateFixed, Search } from 'lucide-react'

export default function LocationField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  variant = 'from',
}) {
  const Icon = variant === 'from' ? LocateFixed : Search

  return (
    <label className={`dp-field dp-field--${variant}`}>
      <div className="dp-field__icon">
        <Icon size={16} strokeWidth={2.2} />
      </div>
      <div className="dp-field__body">
        <span className="dp-field__label">{label}</span>
        <input
          className="dp-field__input"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />
        {hint ? <span className="dp-field__hint">{hint}</span> : null}
      </div>
      <ChevronRight size={16} strokeWidth={2.2} className="dp-field__chevron" />
    </label>
  )
}
