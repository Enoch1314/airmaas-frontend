import { Bot } from 'lucide-react'

export default function FloatingAssistant({ onClick }) {
  return (
    <button
      type="button"
      className="it-fab"
      onClick={onClick}
      aria-label="AirMaaS 助手"
    >
      <Bot size={18} strokeWidth={2.2} />
      <span>助手</span>
    </button>
  )
}
