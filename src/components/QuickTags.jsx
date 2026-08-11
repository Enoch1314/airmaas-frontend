import {
  Palette,
  Music2,
  Heart,
  CloudSun,
  Coffee,
  Smile,
} from 'lucide-react'
import { quickTags } from '../data/mockData'

const iconMap = {
  palette: Palette,
  music: Music2,
  heart: Heart,
  cloud: CloudSun,
  coffee: Coffee,
  smile: Smile,
}

export default function QuickTags({ selectedId, onSelect }) {
  return (
    <section className="quick-tags" aria-label="快捷标签">
      <div className="quick-tags__scroller">
        {quickTags.map((tag) => {
          const Icon = iconMap[tag.icon]
          const active = selectedId === tag.id
          return (
            <button
              key={tag.id}
              type="button"
              className={`quick-tag${active ? ' is-active' : ''}`}
              onClick={() => onSelect?.(tag)}
            >
              <span className={`quick-tag__icon quick-tag__icon--${tag.id}`}>
                <Icon size={15} strokeWidth={2.2} />
              </span>
              <span>{tag.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
