import { ACCOUNTS } from '../config'

// accountStatuses: { akun1: 'success' | 'pending' | 'failed' | null }
export default function AccountSelector({ selectedAccounts, onToggle, onSelectAll, accountStatuses = {} }) {
  const allSelected = selectedAccounts.length === ACCOUNTS.length

  const getStatusStyle = (accountId) => {
    const status = accountStatuses[accountId]
    if (status === 'success') return { borderColor: 'var(--success)', background: 'var(--success-light)' }
    if (status === 'pending') return { borderColor: 'var(--accent)', background: 'var(--accent-light)' }
    if (status === 'failed')  return { borderColor: 'var(--danger)', background: 'var(--danger-light)' }
    return {}
  }

  const getStatusBadge = (accountId) => {
    const status = accountStatuses[accountId]
    if (status === 'success') return <span className="account-status-badge badge-success">✓ OK</span>
    if (status === 'pending') return <span className="account-status-badge badge-info">⏳ Proses</span>
    if (status === 'failed')  return <span className="account-status-badge badge-danger">✗ Gagal</span>
    return null
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Pilih Akun
        </label>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => onSelectAll(!allSelected)}
          type="button"
        >
          {allSelected ? 'Batal Semua' : 'Pilih Semua'}
        </button>
      </div>
      <div className="accounts-grid">
        {ACCOUNTS.map((account) => {
          const isSelected = selectedAccounts.includes(account.id)
          return (
            <div
              key={account.id}
              className={`account-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onToggle(account.id)}
              style={isSelected ? getStatusStyle(account.id) : {}}
            >
              <div className="account-avatar">{account.avatar}</div>
              <div className="account-name">{account.name}</div>
              <div className="account-id">{account.id}</div>
              <div className="account-port">CDP :{account.port}</div>
              {isSelected && getStatusBadge(account.id)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
