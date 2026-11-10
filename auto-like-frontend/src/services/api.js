import axios from 'axios'
import { API_BASE } from '../config'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor untuk handle error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// ===== Auto-Like API =====

/**
 * Kirim request auto-like ke backend
 * @param {string} url - URL video TikTok
 * @param {string[]} accounts - Array account IDs ['akun1', 'akun2', ...]
 */
export const startAutoLike = async (url, accounts) => {
  const response = await api.post('/like', { url, accounts })
  return response.data
}

/**
 * Like dengan satu akun
 */
export const likeWithAccount = async (url, accountId) => {
  const response = await api.post('/like/single', { url, account: accountId })
  return response.data
}

/**
 * Cek status Chrome CDP
 */
export const checkBrowserStatus = async () => {
  const response = await api.get('/browsers/status')
  return response.data
}

/**
 * Ambil riwayat task
 */
export const getTaskHistory = async (page = 1, limit = 20) => {
  const response = await api.get('/tasks', { params: { page, limit } })
  return response.data
}

/**
 * Ambil detail task
 */
export const getTaskDetail = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}`)
  return response.data
}

/**
 * Ambil statistik dashboard
 */
export const getDashboardStats = async () => {
  const response = await api.get('/stats')
  return response.data
}

/**
 * Tes koneksi ke backend
 */
export const healthCheck = async () => {
  const response = await api.get('/health')
  return response.data
}

export default api

