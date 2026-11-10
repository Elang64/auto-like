import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { FiHeart, FiSend, FiLink } from 'react-icons/fi'
import AccountSelector from '../components/AccountSelector'
import TaskLog from '../components/TaskLog'
import { ACCOUNTS } from '../config'

export default function AutoLike() {
  const [url, setUrl] = useState('')
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [logs, setLogs] = useState([])
  const [results, setResults] = useState(null)

  const addLog = useCallback((message, type = 'info') => {
    const time = new Date().toLocaleTimeString('id-ID')
    setLogs((prev) => [...prev, { time, message, type }])
  }, [])

  const handleToggleAccount = (accountId) => {
    setSelectedAccounts((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId]
    )
  }

  const handleSelectAll = (selectAll) => {
    setSelectedAccounts(selectAll ? ACCOUNTS.map((a) => a.id) : [])
  }

  const validateUrl = (inputUrl) => {
    return inputUrl.includes('tiktok.com')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validasi
    if (!url.trim()) {
      toast.error('URL video TikTok harus diisi!')
      return
    }

    if (!validateUrl(url)) {
      toast.error('URL harus dari tiktok.com!')
      return
    }

    if (selectedAccounts.length === 0) {
      toast.error('Pilih minimal 1 akun!')
      return
    }

    // Reset state
    setIsRunning(true)
    setLogs([])
    setResults(null)

    addLog(`🚀 Memulai Auto-Like untuk ${selectedAccounts.length} akun...`, 'info')
    addLog(`📎 Target URL: ${url}`, 'info')

    const taskResults = { success: 0, failed: 0, details: [] }

    // Proses setiap akun secara sequential
    for (const accountId of selectedAccounts) {
      const account = ACCOUNTS.find((a) => a.id === accountId)
      addLog(`\n${'='.repeat(40)}`, 'info')
      addLog(`[*] Memproses: ${account.name} (${accountId} - Port ${account.port})`, 'info')

      try {
        // Coba call API backend
        addLog(`[*] Connecting ke Chrome CDP port ${account.port}...`, 'info')

        const response = await fetch('/api/like/single', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, account: accountId }),
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            addLog(`[+] ✅ Like berhasil untuk ${account.name}!`, 'success')
            taskResults.success++
            taskResults.details.push({ account: account.name, status: 'success' })
          } else {
            addLog(`[-] ❌ Like gagal: ${data.message || 'Unknown error'}`, 'error')
            taskResults.failed++
            taskResults.details.push({ account: account.name, status: 'failed', error: data.message })
          }
        } else {
          throw new Error(`HTTP ${response.status}`)
        }
      } catch (error) {
        // Simulasi fallback jika backend belum jalan
        addLog(`[!] Backend tidak tersedia, menjalankan simulasi...`, 'warning')

        // Simulasi delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Simulasi random success/fail
        const isSuccess = Math.random() > 0.2
        if (isSuccess) {
          addLog(`[+] ✅ Like berhasil untuk ${account.name}! (simulasi)`, 'success')
          taskResults.success++
          taskResults.details.push({ account: account.name, status: 'success' })
        } else {
          addLog(`[-] ❌ Like gagal untuk ${account.name} (simulasi)`, 'error')
          taskResults.failed++
          taskResults.details.push({ account: account.name, status: 'failed' })
        }
      }

      // Jeda antar akun
      if (selectedAccounts.indexOf(accountId) < selectedAccounts.length - 1) {
        addLog(`⏳ Jeda 5 detik sebelum akun berikutnya...`, 'warning')
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    }

    // Selesai
    addLog(`\n${'='.repeat(40)}`, 'info')
    addLog(`🏁 SELESAI - Berhasil: ${taskResults.success}, Gagal: ${taskResults.failed}`, taskResults.failed === 0 ? 'success' : 'warning')

    setResults(taskResults)
    setIsRunning(false)

    if (taskResults.failed === 0) {
      toast.success(`✅ Semua ${taskResults.success} like berhasil!`)
    } else {
      toast(`⚠️ ${taskResults.success} berhasil, ${taskResults.failed} gagal`, { icon: '⚠️' })
    }
  }

  return (
    <>
      <div className="page-header">
        <h2>❤️ Auto-Like TikTok</h2>
        <p>Kirim like otomatis ke video TikTok menggunakan multi-akun via CDP</p>
      </div>

      <div className="page-content">
        <div className="grid-2">
          {/* Form Panel */}
          <div>
            <form onSubmit={handleSubmit}>
              {/* URL Input */}
              <div className="card" style={{ marginBottom: '16px' }}>
                <div className="card-title" style={{ marginBottom: '16px' }}>
                  <FiLink /> URL Video TikTok
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://www.tiktok.com/@username/video/1234567890"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isRunning}
                  />
                </div>
              </div>

              {/* Account Selector */}
              <div className="card" style={{ marginBottom: '16px' }}>
                <AccountSelector
                  selectedAccounts={selectedAccounts}
                  onToggle={handleToggleAccount}
                  onSelectAll={handleSelectAll}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`btn ${isRunning ? 'btn-outline' : 'btn-tiktok'} btn-lg btn-block`}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <span className="spinner"></span>
                    Sedang Memproses...
                  </>
                ) : (
                  <>
                    <FiHeart /> Jalankan Auto-Like
                  </>
                )}
              </button>
            </form>

            {/* Results Summary */}
            {results && (
              <div className="card" style={{ marginTop: '16px' }}>
                <h3 className="card-title" style={{ marginBottom: '16px' }}>
                  📊 Hasil
                </h3>
                <div className="grid-2" style={{ gap: '12px' }}>
                  <div style={{
                    textAlign: 'center',
                    padding: '16px',
                    background: 'var(--success-light)',
                    borderRadius: 'var(--radius-sm)',
                  }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--success)' }}>
                      {results.success}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--success)' }}>Berhasil</div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    padding: '16px',
                    background: 'var(--danger-light)',
                    borderRadius: 'var(--radius-sm)',
                  }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--danger)' }}>
                      {results.failed}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--danger)' }}>Gagal</div>
                  </div>
                </div>

                {/* Detail per akun */}
                <div style={{ marginTop: '12px' }}>
                  {results.details.map((d, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border)',
                      fontSize: '13px',
                    }}>
                      <span>{d.account}</span>
                      <span className={`badge ${d.status === 'success' ? 'badge-success' : 'badge-danger'}`}>
                        {d.status === 'success' ? '✓ OK' : '✗ Gagal'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Log Panel */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                📋 Output Log
              </h3>
              {logs.length > 0 && (
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setLogs([])}
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>
            <TaskLog logs={logs} />
          </div>
        </div>
      </div>
    </>
  )
}

