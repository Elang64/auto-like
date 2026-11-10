import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import AutoLike from './pages/AutoLike'
import BrowserStatus from './pages/BrowserStatus'
import TaskHistory from './pages/TaskHistory'
import Settings from './pages/Settings'

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auto-like" element={<AutoLike />} />
          <Route path="/browsers" element={<BrowserStatus />} />
          <Route path="/history" element={<TaskHistory />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

