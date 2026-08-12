import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import DirectPlan from './pages/DirectPlan'
import SmartPlan from './pages/SmartPlan'
import NeedConfirm from './pages/NeedConfirm'
import Generating from './pages/Generating'
import Compare from './pages/Compare'
import PlanDetail from './pages/PlanDetail'
import TimeGuarantee from './pages/TimeGuarantee'
import ServiceSelect from './pages/ServiceSelect'
import Matching from './pages/Matching'
import OrderConfirm from './pages/OrderConfirm'
import BookingSuccess from './pages/BookingSuccess'
import Itinerary from './pages/Itinerary'
import FlightExperience from './pages/FlightExperience'
import Activity from './pages/Activity'
import ReturnAdjust from './pages/ReturnAdjust'
import TripAdjust from './pages/TripAdjust'
import TripResult from './pages/TripResult'
import WeekendReport from './pages/WeekendReport'
import TimeBank from './pages/TimeBank'
import Profile from './pages/Profile'

export default function App() {
  return (
    <HashRouter>
      <div className="desktop-stage">
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/direct-plan" element={<DirectPlan />} />
          <Route path="/smart-plan" element={<SmartPlan />} />
          <Route path="/need-confirm" element={<NeedConfirm />} />
          <Route path="/generating" element={<Generating />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/plan-detail" element={<PlanDetail />} />
          <Route path="/time-guarantee" element={<TimeGuarantee />} />
          <Route path="/service-select" element={<ServiceSelect />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/return-adjust" element={<ReturnAdjust />} />
          <Route path="/trip-adjust" element={<TripAdjust />} />
          <Route path="/trip-result" element={<TripResult />} />
          <Route path="/flight-experience" element={<FlightExperience />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/time-bank" element={<TimeBank />} />
          <Route path="/weekend-report" element={<WeekendReport />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
