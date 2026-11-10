import { useState } from 'react'
import { FiClock, FiSearch, FiFilter, FiCheckCircle, FiXCircle } from 'react-icons/fi'

const DUMMY_HISTORY = [
  {
    id: 'task_001',
    url: 'https://tiktok.com/@faturikhsan/video/7301234567890',
    accounts: ['akun1', 'akun2', 'akun3', 'akun4', 'akun5'],
    status: 'success',
    results: { success: 5, failed: 0 },
    duration: '32s',
    timestamp: '2026-11-10 13:25:00',
  },
  {
    id: 'task_002',
    url: 'https://tiktok.com/@ridetes7/video/7302345678901',
    accounts: ['akun1', 'akun2', 'akun3'],
    status: 'partial',
    results: { success: 2, failed: 1 },
    duration: '25s',
    timestamp: '2026-11-10 12:40:00',
  },
  {
    id: 'task_003',
    url: 'https://tiktok.com/@creator/video/7303456789012',
    accounts: ['akun4', 'akun5'],
    status: 'success',
    results: { success: 2, failed: 0 },
    duration: '15s',
    timestamp: '2026-11-10 11:15:00',
  },
  {
    id: 'task_004',
    url: 'https://tiktok.com/@user123/video/7304567890123',
    accounts: ['akun1'],
    status: 'failed',
    results: { success: 0, failed: 1 },
    duration: '8s',
    timestamp: '2026-11-10 10:00:00',
  },
  {
    id: 'task_005',
    url: 'https://tiktok.com/@gptridho/video/7305678901234',
    accounts: ['akun1', 'akun2', 'akun3', 'akun4', 'akun5'],
    status: 'success',
    results: { success: 5, failed: 0 },
    duration: '45s',
    timestamp: '2026-11-09 23:30:00',
  },
  {
    id: 'task_006',
    url: 'https://tiktok.com/@testuser/video/7306789012345',
    accounts: ['akun2', 'akun3'],
    status: 'success',
    results: { success: 2, failed: 0 },
    duration: '18s',
    timestamp: '2026-11-09 22:15:00',
  },
  {
    id: 'task_007',
    url: 'https://tiktok.com/@another/video/7307890123456',
    accounts: ['akun1', 'akun2', 'akun3', 'akun4'],
    status: 'partial',
    results: { success: 3, failed: 1 },
    duration: '35s',
    timestamp: '2026-11-09 20:00:00',
  },
]

export default function TaskHistory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = DUMMY_HISTORY.filter((task) => {
    const matchSearch = task.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        task.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchFilter = filterStatus === 'all' || task.status === filterStatus
    return matchSearch && matchFilter
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return <span className="badge badge-success"><FiCheckCircle /> Berhasil</span>
      case 'partial':
        return <span className="badge badge-warning"><FiClock /> Sebagian</span>
      case 'failed':
        return <span className="badge badge-danger"><FiXCircle /> Gagal</span>
      default:
        return <span className="badge badge-info">{status}</span>
    }
  }

  const truncateUrl = (url) => {
    if (url.length > 50) return url.substring(0, 50) + '...'
    return url
  }

  return (
    <>
      <div className="page-header">
        <h2>📋 Riwayat Task</h2>
        <p>Semua riwayat task Auto-Like yang pernah dijalankan</p>
      </div>

      <div className="page-content">
        {/* Search & Filter */}
        <div className="card" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
              <FiSearch style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }} />
              <input
                type="text"
                className="form-input"
                placeholder="Cari URL atau Task ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '36px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['all', 'success', 'partial', 'failed'].map((status) => (
                <button
                  key={status}
                  className={`btn btn-sm ${filterStatus === status ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status === 'all' ? 'Semua' : status === 'success' ? 'Berhasil' : status === 'partial' ? 'Sebagian' : 'Gagal'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Task Table */}
        <div className="card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>URL Video</th>
                  <th>Akun</th>
                  <th>Hasil</th>
                  <th>Durasi</th>
                  <th>Status</th>
                  <th>Waktu</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7">
                      <div className="empty-state">
                        <p>Tidak ada task ditemukan.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((task) => (
                    <tr key={task.id}>
                      <td>
                        <code style={{
                          padding: '2px 8px',
                          background: 'var(--bg-tertiary)',
                          borderRadius: '4px',
                          fontSize: '12px',
                        }}>
                          {task.id}
                        </code>
                      </td>
                      <td>
                        <a
                          href={task.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--accent)', fontSize: '13px' }}
                        >
                          {truncateUrl(task.url)}
                        </a>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {task.accounts.map((acc) => (
                            <span
                              key={acc}
                              style={{
                                fontSize: '11px',
                                padding: '2px 6px',
                                background: 'var(--bg-tertiary)',
                                borderRadius: '4px',
                                color: 'var(--text-secondary)',
                              }}
                            >
                              {acc}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span style={{ color: 'var(--success)' }}>✓{task.results.success}</span>
                        {' / '}
                        <span style={{ color: 'var(--danger)' }}>✗{task.results.failed}</span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                        {task.duration}
                      </td>
                      <td>{getStatusBadge(task.status)}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '13px', whiteSpace: 'nowrap' }}>
                        {task.timestamp}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

