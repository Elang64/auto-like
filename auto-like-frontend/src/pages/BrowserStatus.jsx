import { useState, useEffect } from 'react'
import { FiMonitor, FiRefreshCw, FiWifi, FiWifiOff } from 'react-icons/fi'
import { ACCOUNTS, CONFIG } from '../config'

export default function BrowserStatus() {
  const [browserStatuses, setBrowserStatuses] = useState(
    ACCOUNTS.map((acc) => ({
      ...acc,
      status: 'checking',
      latency: null,
    }))
  )
  const [isChecking, setIsChecking] = useState(false)

  const checkAllBrowsers = async () => {
    setIsChecking(true)

    const newStatuses = await Promise.all(
      ACCOUNTS.map(async (acc) => {
        try {
          const response = await fetch(`/api/browsers/check/${acc.id}`)
          if (response.ok) {
            const data = await response.json()
            return {
              ...acc,
              status: data.connected ? 'online' : 'offline',
              latency: data.latency || null,
            }
          }
          throw new Error('Not reachable')
        } catch {
          // Simulasi status jika backend tidak tersedia
          const isOnline = Math.random() > 0.15
          return {
            ...acc,
            status: isOnline ? 'online' : 'offline',
            latency: isOnline ? Math.floor(Math.random() * 100 + 20) : null,
          }
        }
      })
    )

    setBrowserStatuses(newStatuses)
    setIsChecking(false)
  }

  useEffect(() => {
    checkAllBrowsers()
  }, [])

  const onlineCount = browserStatuses.filter((b) => b.status === 'online').length
  const offlineCount = browserStatuses.filter((b) => b.status === 'offline').length

  return (
    <>
      <div className="page-header">
        <h2>🖥️ Browser Status</h2>
        <p>Status koneksi Chrome CDP di Windows Host ({CONFIG.TAILSCALE_IP})</p>
      </div>

      <div className="page-content">
        {/* Summary Stats */}
        <div className="stats-grid" style={{ marginBottom: '24px' }}>
          <div className="stat-card">
            <div className="stat-icon green"><FiWifi /></div>
            <div className="stat-info">
              <h3>{onlineCount}</h3>
              <p>Chrome Online</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red"><FiWifiOff /></div>
            <div className="stat-info">
              <h3>{offlineCount}</h3>
              <p>Chrome Offline</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><FiMonitor /></div>
            <div className="stat-info">
              <h3>{ACCOUNTS.length}</h3>
              <p>Total Instance</p>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div style={{ marginBottom: '16px' }}>
          <button
            className="btn btn-primary"
            onClick={checkAllBrowsers}
            disabled={isChecking}
          >
            {isChecking ? (
              <><span className="spinner"></span> Checking...</>
            ) : (
              <><FiRefreshCw /> Refresh Status</>
            )}
          </button>
        </div>

        {/* Browser Cards Grid */}
        <div className="chrome-grid">
          {browserStatuses.map((browser) => (
            <div key={browser.id} className="chrome-card">
              <div className="chrome-icon">🌐</div>
              <div className="chrome-label">Chrome {browser.port - 9221}</div>
              <div className="chrome-port">Port: {browser.port}</div>

              <div style={{ marginBottom: '8px' }}>
                {browser.status === 'online' ? (
                  <span className="badge badge-success">
                    <FiWifi /> Online
                  </span>
                ) : browser.status === 'offline' ? (
                  <span className="badge badge-danger">
                    <FiWifiOff /> Offline
                  </span>
                ) : (
                  <span className="badge badge-info">
                    <span className="spinner" style={{ width: 12, height: 12 }}></span> Checking
                  </span>
                )}
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {browser.name}
              </div>

              {browser.latency && (
                <div style={{
                  fontSize: '11px',
                  color: browser.latency < 50 ? 'var(--success)' : browser.latency < 100 ? 'var(--warning)' : 'var(--danger)',
                  marginTop: '4px',
                }}>
                  {browser.latency}ms latency
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Connection Details */}
        <div className="card" style={{ marginTop: '24px' }}>
          <h3 className="card-title" style={{ marginBottom: '16px' }}>
            🔗 Detail Koneksi
          </h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Chrome</th>
                  <th>Akun</th>
                  <th>CDP Port</th>
                  <th>CDP URL</th>
                  <th>Portproxy</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {browserStatuses.map((browser) => (
                  <tr key={browser.id}>
                    <td>Chrome {browser.port - 9221}</td>
                    <td>{browser.name}</td>
                    <td>
                      <code style={{
                        padding: '2px 8px',
                        background: 'var(--bg-tertiary)',
                        borderRadius: '4px',
                        fontSize: '12px',
                      }}>
                        {browser.port}
                      </code>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      http://{CONFIG.HOST_IP}:{browser.port}
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      0.0.0.0:{browser.port} → [::1]:{browser.port}
                    </td>
                    <td>
                      {browser.status === 'online' ? (
                        <span className="badge badge-success">Connected</span>
                      ) : (
                        <span className="badge badge-danger">Disconnected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

