import { ShieldCheck } from 'lucide-react'

export default function GuaranteeHint() {
  return (
    <aside className="dp-guarantee">
      <div className="dp-guarantee__icon">
        <ShieldCheck size={18} strokeWidth={2.2} />
      </div>
      <div>
        <h4>需要准时到达？</h4>
        <p>
          后续可以添加「到达保障」，平台将围绕这个时间安排完整行程，
          并可继续叠加活动时长保障与返程保障。
        </p>
      </div>
    </aside>
  )
}
