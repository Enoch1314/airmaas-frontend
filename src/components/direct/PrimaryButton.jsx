import { Sparkles } from 'lucide-react'

export default function PrimaryButton({ children, onClick, icon = true }) {
  return (
    <button type="button" className="dp-primary-btn" onClick={onClick}>
      {icon ? <Sparkles size={16} strokeWidth={2.2} /> : null}
      {children}
    </button>
  )
}
