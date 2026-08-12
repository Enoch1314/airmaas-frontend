import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { placeholderPages } from '../data/mockData'

export default function PlaceholderPage({ title }) {
  const navigate = useNavigate()
  const location = useLocation()
  const pageTitle = title || placeholderPages[location.pathname] || '页面'
  const carried = location.state

  return (
    <div className="phone-shell">
      <div className="app-page placeholder-page">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} strokeWidth={2.2} />
          返回
        </button>

        <div className="placeholder-card">
          <h1>{pageTitle}</h1>
          <p>下一阶段完善</p>
          {carried?.from ? (
            <p className="placeholder-carry">
              已接收：{carried.from} → {carried.to}
              <br />
              {carried.timeValue} · {carried.companions}人
            </p>
          ) : null}
          {carried?.source === 'smart-plan' ? (
            <p className="placeholder-carry">
              已确认体验导向智能规划需求
              <br />
              {(carried.conditions || []).slice(0, 4).map((item) => item.label).join(' · ')}
              {carried.returnLabel ? ` · ${carried.returnLabel}` : ''}
            </p>
          ) : null}
          {carried?.source === 'need-confirm' ? (
            <p className="placeholder-carry">
              正在生成周末方案
              <br />
              {carried.dayLabel} {carried.availableTime} · 预算约{carried.budget}元
              <br />
              {carried.returnBefore}前回家
            </p>
          ) : null}
          {carried?.selectedPlan ? (
            <p className="placeholder-carry">
              已选择：{carried.selectedPlan.name}
              <br />
              生活时间 {carried.selectedPlan.lifeTime}
              {carried.selectedPlan.gainMinutes
                ? ` · 多留 ${carried.selectedPlan.gainMinutes} 分钟`
                : ''}
            </p>
          ) : null}
          {carried?.planName && !carried?.selectedService ? (
            <p className="placeholder-carry">
              方案：{carried.planName}
              <br />
              保障：
              {carried.selectedIds?.length
                ? carried.selectedIds.join(' / ')
                : '暂不添加'}
              <br />
              预计总额：¥{carried.totalFee}
            </p>
          ) : null}
          {carried?.selectedService ? (
            <p className="placeholder-carry">
              方案：{carried.planName}
              <br />
              组合：{carried.serviceTitle} ＋ {carried.routeTitle}
              <br />
              预计订单：¥{carried.totalFee}
            </p>
          ) : null}
          {carried?.serviceTitle && carried?.status ? (
            <p className="placeholder-carry">
              方案：{carried.plan?.planType || carried.planType}
              <br />
              班次：{carried.serviceTitle} ＋ {carried.routeTitle}
              <br />
              状态：{carried.status}
              {carried.alternative ? ` · 替代 ${carried.alternative}` : ''}
            </p>
          ) : null}
          {typeof carried?.payable === 'number' && !carried?.flight ? (
            <p className="placeholder-carry">
              已确认：{carried.plan?.planType || carried.planType}方案
              <br />
              {carried.serviceTitle} ＋ {carried.routeTitle}
              <br />
              实付：¥{carried.payable}
              {carried.timeCoinEnabled ? ' · 已使用时间币' : ''}
            </p>
          ) : null}
          {carried?.flight ? (
            <p className="placeholder-carry">
              数字行程：{carried.plan?.planType || carried.planType}方案
              <br />
              {carried.serviceTitle} ＋ {carried.routeTitle}
              <br />
              集合 {carried.flight.gatherTime} · 起飞 {carried.flight.takeoff}
            </p>
          ) : null}
          {carried?.landing ? (
            <p className="placeholder-carry">
              已模拟落地：{carried.plan?.planType || carried.planType}方案
              <br />
              {carried.serviceTitle} ＋ {carried.routeTitle}
              <br />
              {carried.landing.eta}
            </p>
          ) : null}
          <button
            type="button"
            className="btn btn--blue"
            onClick={() => navigate('/home')}
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  )
}
