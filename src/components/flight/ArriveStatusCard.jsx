import { boardingInfo } from '../../data/flightExperienceData'

export default function ArriveStatusCard({ verified, takeoff, gatherTime, onVerify }) {
  return (
    <section className={`fe-arrive${verified ? ' is-verified' : ''}`}>
      <div className="fe-arrive__badge">{verified ? '核验完成' : '已到达 · 等待核验'}</div>
      <h2>你已抵达汇聚枢纽</h2>
      <div className="fe-arrive__grid">
        <div>
          <span>到达时间</span>
          <strong>✓ {boardingInfo.arrivedAt}</strong>
        </div>
        <div>
          <span>集合要求</span>
          <strong>{gatherTime} 前</strong>
        </div>
        <div>
          <span>预计起飞</span>
          <strong>{takeoff}</strong>
        </div>
        <div>
          <span>当前状态</span>
          <strong>{verified ? '已核验 · 待登乘' : '已到达 · 等待核验'}</strong>
        </div>
      </div>
      {!verified ? (
        <button type="button" className="fe-primary" onClick={onVerify}>
          开始身份核验
        </button>
      ) : null}
    </section>
  )
}
