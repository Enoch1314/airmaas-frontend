import { X } from 'lucide-react'

export default function ConditionTags({ items, onRemove }) {
  if (!items.length) return null

  return (
    <div className="sp-conditions" aria-label="已识别条件">
      {items.map((item) => (
        <span key={item.id} className="sp-condition">
          {item.label}
          <button
            type="button"
            className="sp-condition__remove"
            aria-label={`删除 ${item.label}`}
            onClick={() => onRemove?.(item.id)}
          >
            <X size={12} strokeWidth={2.4} />
          </button>
        </span>
      ))}
    </div>
  )
}
