import { ACCOUNTS } from '../config'

export default function AccountSelector({ selectedAccounts, onToggle, onSelectAll }) {
  const allSelected = selectedAccounts.length === ACCOUNTS.length

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
            >
              <div className="account-avatar">{account.avatar}</div>
              <div className="account-name">{account.name}</div>
              <div className="account-id">{account.id}</div>
              <div className="account-port">CDP :{account.port}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

