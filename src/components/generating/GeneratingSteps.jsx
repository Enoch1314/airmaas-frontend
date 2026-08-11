import { Check, LoaderCircle } from 'lucide-react'
import { generatingSteps as defaultSteps } from '../../data/generatingData'

export default function GeneratingSteps({
  currentStep,
  done,
  steps = defaultSteps,
}) {
  return (
    <section className="gn-steps">
      {steps.map((label, index) => {
        let status = 'pending'
        if (done || index < currentStep) status = 'done'
        else if (index === currentStep) status = 'active'

        return (
          <div key={label} className={`gn-step is-${status}`}>
            <div className="gn-step__mark">
              {status === 'done' ? (
                <Check size={14} strokeWidth={2.6} />
              ) : status === 'active' ? (
                <LoaderCircle size={14} strokeWidth={2.4} className="gn-spin" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="gn-step__body">
              <p>{label}</p>
              <span>
                {status === 'done'
                  ? '已完成'
                  : status === 'active'
                    ? '进行中'
                    : '未开始'}
              </span>
            </div>
          </div>
        )
      })}
    </section>
  )
}
