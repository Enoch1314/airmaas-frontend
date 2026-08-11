import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { adjustRules } from '../../data/orderConfirmData'

export default function OrderRulesCollapse() {
  const [open, setOpen] = useState(false)

  return (
    <section className={`oc-rules${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="oc-rules__toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>如果计划发生变化怎么办？</span>
        <ChevronDown size={16} strokeWidth={2.2} />
      </button>
      {open ? (
        <ul>
          {adjustRules.map((rule) => (
            <li key={rule.title}>
              <strong>{rule.title}</strong>
              <span>→ {rule.action}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
