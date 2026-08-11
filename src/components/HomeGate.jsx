import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import { hasSeenOnboarding } from '../data/welcomeData'

/** First visit → /welcome; later visits stay on Home. /welcome remains always open. */
export default function HomeGate() {
  if (!hasSeenOnboarding()) {
    return <Navigate to="/welcome" replace />
  }
  return <Home />
}
