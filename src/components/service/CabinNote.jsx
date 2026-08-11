import { useState } from 'react'
import { ChevronDown, Info } from 'lucide-react'

export default function CabinNote() {
  const [open, setOpen] = useState(false)

  return (
    <section className={`ss-note${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="ss-note__toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>
          <Info size={14} strokeWidth={2.2} />
          关于“舱型”
        </span>
        <ChevronDown size={16} strokeWidth={2.2} />
      </button>
      {open ? (
        <p>
          “舱型”表示不同的共享班次组织和服务方式，不代表飞行器设置固定物理隔舱。
        </p>
      ) : null}
    </section>
  )
}
