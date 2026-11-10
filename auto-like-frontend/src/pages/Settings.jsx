import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiSettings, FiSave, FiServer, FiShield, FiClock } from 'react-icons/fi'
import { CONFIG } from '../config'

export default function Settings() {
  const [settings, setSettings] = useState({
    hostIp: CONFIG.HOST_IP,
    tailscaleIp: CONFIG.TAILSCALE_IP,
    backendUrl: 'http://localhost:8081',
    delayBetweenAccounts: 5,
    maxRetries: 3,
    timeout: 60,
    humanDelay: true,
    saveScreenshots: true,
  })

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Simpan ke localStorage untuk sementara
    localStorage.setItem('rda-settings', JSON.stringify(settings))
    toast.success('Pengaturan berhasil disimpan!')
  }

  return (
    <>
      <div className="page-header">
        <h2>⚙️ Pengaturan</h2>
        <p>Konfigurasi Auto-Like dan koneksi sistem</p>
      </div>

      <div className="page-content">
        <div className="grid-2">
          {/* Connection Settings */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '20px' }}>
              <FiServer /> Koneksi
            </h3>

            <div className="form-group">
              <label>Host IP (Docker VM)</label>
              <input
                type="text"
                className="form-input"
                value={settings.hostIp}
                onChange={(e) => handleChange('hostIp', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Tailscale IP (Windows Host)</label>
              <input
                type="text"
                className="form-input"
                value={settings.tailscaleIp}
                onChange={(e) => handleChange('tailscaleIp', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Backend URL (FastAPI)</label>
              <input
                type="text"
                className="form-input"
                value={settings.backendUrl}
                onChange={(e) => handleChange('backendUrl', e.target.value)}
              />
            </div>
          </div>

          {/* Automation Settings */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '20px' }}>
              <FiClock /> Automation
            </h3>

            <div className="form-group">
              <label>Jeda antar akun (detik)</label>
              <input
                type="number"
                className="form-input"
                value={settings.delayBetweenAccounts}
                onChange={(e) => handleChange('delayBetweenAccounts', parseInt(e.target.value))}
                min={1}
                max={30}
              />
            </div>

            <div className="form-group">
              <label>Max retries per akun</label>
              <input
                type="number"
                className="form-input"
                value={settings.maxRetries}
                onChange={(e) => handleChange('maxRetries', parseInt(e.target.value))}
                min={1}
                max={10}
              />
            </div>

            <div className="form-group">
              <label>Timeout (detik)</label>
              <input
                type="number"
                className="form-input"
                value={settings.timeout}
                onChange={(e) => handleChange('timeout', parseInt(e.target.value))}
                min={10}
                max={120}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.humanDelay}
                  onChange={(e) => handleChange('humanDelay', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }}
                />
                <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: '14px', color: 'var(--text-primary)' }}>
                  Aktifkan human-like delay (anti-detect)
                </span>
              </label>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.saveScreenshots}
                  onChange={(e) => handleChange('saveScreenshots', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }}
                />
                <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: '14px', color: 'var(--text-primary)' }}>
                  Simpan screenshot jika gagal (debug)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ marginTop: '24px' }}>
          <button className="btn btn-primary btn-lg" onClick={handleSave}>
            <FiSave /> Simpan Pengaturan
          </button>
        </div>

        {/* System Info */}
        <div className="card" style={{ marginTop: '24px' }}>
          <h3 className="card-title" style={{ marginBottom: '16px' }}>
            <FiShield /> Info Sistem
          </h3>
          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, width: '200px' }}>Sistem</td>
                  <td>RDA - Remote Distributed Automation</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Modul</td>
                  <td>Auto-Like (AL)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Frontend</td>
                  <td>React + Vite (Port 8082)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Backend</td>
                  <td>FastAPI (Port 8081)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Automation</td>
                  <td>Playwright via Chrome DevTools Protocol</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Domain</td>
                  <td>al.socialauto.tech</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>VPS</td>
                  <td>Hostinger (Ubuntu 22.04) — {CONFIG.VPS_IP || '187.77.119.183'}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>VPN</td>
                  <td>Tailscale — {CONFIG.TAILSCALE_IP}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Chrome CDP</td>
                  <td>Port 9222-9226 (5 instance, profil terpisah)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Portproxy</td>
                  <td>Netsh 0.0.0.0:9222-9226 → [::1]:9222-9226</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

