import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function CompensationCollapse() {
  const [open, setOpen] = useState(false)

  return (
    <section className={`tg-collapse${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="tg-collapse__toggle"
        onClick={() => setOpen((v) => !v)}
      >
        <span>如果保障时间没有实现怎么办？</span>
        <ChevronDown size={16} strokeWidth={2.2} />
      </button>
      {open ? (
        <div className="tg-collapse__body">
          <p>
            如果由于平台责任，导致已确认的到达、活动时长或返程目标未完成，平台将根据实际影响程度：
          </p>
          <ul>
            <li>调整后续行程</li>
            <li>提供其他可执行方案</li>
            <li>按规则发放时间币等内部服务权益</li>
          </ul>
          <p>
            时间币仅用于 AirMaaS 平台内部服务，例如优先拼班、改签、活动权益等。不支持现金交易、投资或收益增值。
          </p>
        </div>
      ) : null}
    </section>
  )
}
