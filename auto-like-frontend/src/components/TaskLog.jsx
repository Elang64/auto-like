export default function TaskLog({ logs }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="task-log">
        <div className="empty-state">
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Belum ada log. Mulai task untuk melihat output.
          </p>
        </div>
      </div>
    )
  }

  const getLogClass = (type) => {
    switch (type) {
      case 'success': return 'log-success'
      case 'error': return 'log-error'
      case 'warning': return 'log-warning'
      default: return 'log-info'
    }
  }

  return (
    <div className="task-log">
      {logs.map((log, idx) => (
        <div key={idx} className="log-entry">
          <span className="log-time">[{log.time}]</span>
          <span className={getLogClass(log.type)}>{log.message}</span>
        </div>
      ))}
    </div>
  )
}

