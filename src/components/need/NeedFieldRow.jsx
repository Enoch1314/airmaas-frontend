import { useState } from 'react'
import { Check, Pencil } from 'lucide-react'

export default function NeedFieldRow({
  icon: Icon,
  label,
  value,
  editValue,
  editable = false,
  onSave,
  inputType = 'text',
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(editValue ?? value)

  const startEdit = () => {
    if (!editable) return
    setDraft(editValue ?? value)
    setEditing(true)
  }

  const finishEdit = () => {
    onSave?.(draft)
    setEditing(false)
  }

  return (
    <div className={`nc-field${editable ? ' is-editable' : ''}`}>
      <div className="nc-field__icon">
        <Icon size={15} strokeWidth={2.2} />
      </div>
      <div className="nc-field__body">
        <div className="nc-field__head">
          <span>{label}</span>
          {editable ? (
            editing ? (
              <button type="button" className="nc-field__edit" onClick={finishEdit}>
                完成
                <Check size={13} strokeWidth={2.4} />
              </button>
            ) : (
              <button type="button" className="nc-field__edit" onClick={startEdit}>
                编辑
                <Pencil size={12} strokeWidth={2.2} />
              </button>
            )
          ) : null}
        </div>
        {editing ? (
          <input
            className="nc-field__input"
            type={inputType}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') finishEdit()
            }}
            autoFocus
          />
        ) : (
          <strong className="nc-field__value">{value}</strong>
        )}
      </div>
    </div>
  )
}
