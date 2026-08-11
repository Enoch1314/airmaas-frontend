import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { backupOptions } from '../../data/planDetailData'

export default function BackupCollapse() {
  const [open, setOpen] = useState(false)

  return (
    <section className={`pd-backup${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="pd-backup__toggle"
        onClick={() => setOpen((v) => !v)}
      >
        <span>如果计划发生变化怎么办？</span>
        <ChevronDown size={16} strokeWidth={2.2} />
      </button>

      {open ? (
        <div className="pd-backup__body">
          {backupOptions.map((item) => (
            <div key={item.title} className="pd-backup__item">
              <strong>{item.title}</strong>
              <p>→ {item.action}</p>
            </div>
          ))}
          <p className="pd-backup__note">
            具体费用与时间变化将在行程调整时明确展示。
          </p>
        </div>
      ) : null}
    </section>
  )
}
