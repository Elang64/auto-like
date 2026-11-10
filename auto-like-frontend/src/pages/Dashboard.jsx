import { useState, useEffect } from 'react'
import {
  FiHeart,
  FiMonitor,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
  FiClock,
} from 'react-icons/fi'
import { ACCOUNTS } from '../config'

// Dummy data untuk simulasi (nanti diganti API call)
const DUMMY_STATS = {
  totalLikes: 247,
  successRate: 92,
  activeChrome: 5,
  todayTasks: 12,
}

const RECENT_TASKS = [
  {
    id: 1,
    url: 'https://tiktok.com/@user/video/123456',
    accounts: ['akun1', 'akun2', 'akun3'],
    status: 'success',
    timestamp: '2026-11-10 13:25:00',
    results: { success: 3, failed: 0 },
  },
  {
    id: 2,
    url: 'https://tiktok.com/@creator/video/789012',
    accounts: ['akun1', 'akun2', 'akun3', 'akun4', 'akun5'],
    status: 'partial',
    timestamp: '2026-11-10 12:40:00',
    results: { success: 4, failed: 1 },
  },
  {
    id: 3,
    url: 'https://tiktok.com/@another/video/345678',
    accounts: ['akun4', 'akun5'],
    status: 'success',
    timestamp: '2026-11-10 11:15:00',
    results: { success: 2, failed: 0 },
  },
  {
    id: 4,
    url: 'https://tiktok.com/@test/video/901234',
    accounts: ['akun1'],
    status: 'failed',
    timestamp: '2026-11-10 10:00:00',
    results: { success: 0, failed: 1 },
  },
]

export default function Dashboard() {
  const [stats, setStats] = useState(DUMMY_STATS)
  const [recentTasks, setRecentTasks] = useState(RECENT_TASKS)

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
    if (url.length > 45) return url.substring(0, 45) + '...'
    return url
  }

  return (
    <>
      <div className="page-header">
        <h2>📊 Dashboard</h2>
        <p>Ringkasan aktivitas Auto-Like TikTok</p>
      </div>

      <div className="page-content">
        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <FiHeart />
            </div>
            <div className="stat-info">
              <h3>{stats.totalLikes}</h3>
              <p>Total Likes</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <FiTrendingUp />
            </div>
            <div className="stat-info">
              <h3>{stats.successRate}%</h3>
              <p>Success Rate</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon yellow">
              <FiMonitor />
            </div>
            <div className="stat-info">
              <h3>{stats.activeChrome}</h3>
              <p>Chrome Aktif</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">
              <FiClock />
            </div>
            <div className="stat-info">
              <h3>{stats.todayTasks}</h3>
              <p>Task Hari Ini</p>
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <FiClock /> Task Terbaru
            </h3>
            <a href="/history" className="btn btn-outline btn-sm">
              Lihat Semua
            </a>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>URL Video</th>
                  <th>Akun</th>
                  <th>Hasil</th>
                  <th>Status</th>
                  <th>Waktu</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => (
                  <tr key={task.id}>
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
                      <span style={{ color: 'var(--success)' }}>
                        ✓{task.results.success}
                      </span>
                      {' / '}
                      <span style={{ color: 'var(--danger)' }}>
                        ✗{task.results.failed}
                      </span>
                    </td>
                    <td>{getStatusBadge(task.status)}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                      {task.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid-2" style={{ marginTop: '24px' }}>
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '16px' }}>
              🖥️ Arsitektur Sistem
            </h3>
            <div style={{ fontSize: '13px', lineHeight: 2, color: 'var(--text-secondary)' }}>
              <div><strong>Frontend:</strong> React (Port 8082)</div>
              <div><strong>Backend:</strong> FastAPI (Port 8081)</div>
              <div><strong>Automation:</strong> Playwright via CDP</div>
              <div><strong>Domain:</strong> al.socialauto.tech</div>
              <div><strong>VPN:</strong> Tailscale (100.114.140.47)</div>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '16px' }}>
              👤 Akun Terdaftar
            </h3>
            <div style={{ fontSize: '13px', lineHeight: 2, color: 'var(--text-secondary)' }}>
              {ACCOUNTS.map((acc) => (
                <div key={acc.id}>
                  <span style={{ color: 'var(--accent)' }}>{acc.avatar}</span>
                  {' '}{acc.name}
                  <span style={{ color: 'var(--text-muted)' }}> — Port {acc.port}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

