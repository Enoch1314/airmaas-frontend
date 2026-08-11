export default function OneSentence({ note, editing, draft, onEdit, onChange, onSave, onCancel }) {
  return (
    <section className="wr-note">
      <div className="wr-note__head">
        <h3>给今天留一句话</h3>
        {!editing ? (
          <button type="button" onClick={onEdit}>
            编辑
          </button>
        ) : null}
      </div>
      {editing ? (
        <>
          <textarea
            rows={3}
            value={draft}
            onChange={(e) => onChange(e.target.value)}
            placeholder="今天终于没有把大半天花在路上。"
          />
          <div className="wr-note__actions">
            <button type="button" className="wr-mini" onClick={onSave}>
              保存这句话
            </button>
            <button type="button" className="wr-mini is-ghost" onClick={onCancel}>
              取消
            </button>
          </div>
        </>
      ) : (
        <blockquote>“{note}”</blockquote>
      )}
    </section>
  )
}
