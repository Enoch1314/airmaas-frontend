import { Check } from 'lucide-react'
import { needChecklist } from '../../data/needConfirmData'

export default function ReadyChecklist() {
  return (
    <section className="nc-ready">
      <p className="nc-ready__title">AI 已确认生成方案所需的关键信息</p>
      <ul>
        {needChecklist.map((item) => (
          <li key={item}>
            <Check size={13} strokeWidth={2.4} />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
