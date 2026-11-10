// Data akun-akun TikTok yang terhubung ke Chrome CDP
export const ACCOUNTS = [
  { id: 'akun1', name: 'Fatur Ikhsanudin', port: 9222, avatar: 'FI' },
  { id: 'akun2', name: 'Ridetes7', port: 9223, avatar: 'R7' },
  { id: 'akun3', name: 'Ridonajrul', port: 9224, avatar: 'RN' },
  { id: 'akun4', name: 'Usertestpkl', port: 9225, avatar: 'UT' },
  { id: 'akun5', name: 'Gptridho', port: 9226, avatar: 'GR' },
]

// Konfigurasi koneksi
export const CONFIG = {
  HOST_IP: '172.18.0.1',          // Docker host IP (VM)
  TAILSCALE_IP: '100.114.140.47', // IP Tailscale Windows Host
  VPS_IP: '187.77.119.183',       // VPS Hostinger
  BACKEND_URL: '/api',            // Proxy ke FastAPI backend (port 8081)
  CDP_PORT_START: 9222,
  CDP_PORT_END: 9226,
}

// API Base URL
export const API_BASE = '/api'

