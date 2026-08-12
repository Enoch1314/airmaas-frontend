import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CircleHelp } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import BankHeroCard from '../components/bank/BankHeroCard'
import MonthlyTrend from '../components/bank/MonthlyTrend'
import RecentWeekend from '../components/bank/RecentWeekend'
import GuaranteeHistory from '../components/bank/GuaranteeHistory'
import CoinCard from '../components/bank/CoinCard'
import RedeemCatalog from '../components/bank/RedeemCatalog'
import OwnedBenefits from '../components/bank/OwnedBenefits'
import CoinLedger from '../components/bank/CoinLedger'
import DistinguishCard from '../components/bank/DistinguishCard'
import RedeemDialog from '../components/bank/RedeemDialog'
import HelpSheet from '../components/bank/HelpSheet'
import {
  redeemBenefit,
  resolveTimeBankContext,
} from '../data/timeBankData'
import PageHeroBackdrop from '../components/PageHeroBackdrop'
import { pageHeroPhoto } from '../data/heroBgData'

export default function TimeBank() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [tick, setTick] = useState(0)
  const [helpOpen, setHelpOpen] = useState(false)
  const [coinInfoOpen, setCoinInfoOpen] = useState(false)
  const [ledgerOpen, setLedgerOpen] = useState(false)
  const [redeemItem, setRedeemItem] = useState(null)
  const [toast, setToast] = useState('')

  const ctx = useMemo(
    () => resolveTimeBankContext(location.state, searchParams),
    [location.state, searchParams, tick],
  )

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const confirmRedeem = () => {
    const result = redeemBenefit(redeemItem.id)
    setRedeemItem(null)
    if (!result.ok) {
      showToast(result.message)
      return
    }
    setTick((n) => n + 1)
    showToast('兑换成功，权益已进入「我的可用权益」')
  }

  return (
    <div className="phone-shell phone-shell--subpage phone-shell--timebank">
      <div className="app-page time-bank-page">
        <header className="tb-hero">
          <PageHeroBackdrop src={pageHeroPhoto.timeBank} tone="warm" />
          <div className="tb-topbar">
            <button
              type="button"
              className="tb-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <button
              type="button"
              className="tb-icon-btn"
              aria-label="说明"
              onClick={() => setHelpOpen(true)}
            >
              <CircleHelp size={16} strokeWidth={2.2} />
            </button>
          </div>
          <div className="tb-hero__copy">
            <h1>周末时间银行</h1>
            <p>记录被省下来的时间，也记录那些被守住的周末。</p>
          </div>
        </header>

        <BankHeroCard
          totalLabel={ctx.totalRecoveredLabel}
          monthlyLabel={ctx.monthlyRecoveredLabel}
          completedGuarantees={ctx.completedGuarantees}
          timeCoins={ctx.timeCoins}
        />

        <MonthlyTrend
          records={ctx.monthlyRecords}
          monthlyLabel={ctx.monthlyRecoveredLabel}
        />

        <RecentWeekend
          recent={ctx.recent}
          onOpenReport={() => navigate('/weekend-report', { state: location.state })}
        />

        <GuaranteeHistory items={ctx.guaranteeHistory} />

        <CoinCard
          coins={ctx.timeCoins}
          open={coinInfoOpen}
          onToggle={() => setCoinInfoOpen((v) => !v)}
        />

        <DistinguishCard distinguish={ctx.distinguish} />

        <RedeemCatalog
          items={ctx.redeemCatalog}
          onRedeem={setRedeemItem}
        />

        <OwnedBenefits
          items={ctx.ownedBenefits}
          onUse={() =>
            showToast('将在下一次方案或拼班中自动提示使用。')
          }
        />

        <CoinLedger
          open={ledgerOpen}
          onToggle={() => setLedgerOpen((v) => !v)}
          items={ctx.coinLedger}
        />
      </div>

      <BottomNav />

      <RedeemDialog
        open={Boolean(redeemItem)}
        item={redeemItem}
        onConfirm={confirmRedeem}
        onClose={() => setRedeemItem(null)}
      />
      <HelpSheet open={helpOpen} onClose={() => setHelpOpen(false)} />

      <div className={`toast tb-toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
