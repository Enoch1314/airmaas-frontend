import { Home, CalendarRange, Clock3, UserRound } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { navItems } from '../data/mockData'

const icons = {
  home: Home,
  trips: CalendarRange,
  time: Clock3,
  me: UserRound,
}

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="bottom-nav" aria-label="底部导航">
      {navItems.map((item) => {
        const Icon = icons[item.id]
        const active =
          item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path)

        return (
          <button
            key={item.id}
            type="button"
            className={`bottom-nav__item${active ? ' is-active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <Icon size={20} strokeWidth={active ? 2.45 : 2} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
