export default function DemoStatusBar({ status, onChange }) {
  const items = [
    { id: 'matching', label: '正在匹配' },
    { id: 'formed', label: '已成班' },
    { id: 'notFormed', label: '未成班' },
  ]

  return (
    <div className="mt-demo">
      <span>演示状态</span>
      <div>
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            className={status === item.id ? 'is-on' : ''}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
