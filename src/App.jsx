import { useState } from 'react'
import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  const handleLoginSuccess = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  // Update user data (name, email, etc.). For this prototype we just merge fields into `user`.
  const handleUpdateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="app">
      {user ? (
        <HomePage user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />
      ) : (
        <div className="login-container">
          <div className="mobile-frame">
            <div className="status-bar">
              <span className="time">9:41</span>
            </div>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
