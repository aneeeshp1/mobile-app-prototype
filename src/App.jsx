import { useState } from 'react'
import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'
import './App.css'

function App() {
  // Temporarily bypass login: start with a dummy user
  const [user, setUser] = useState({ name: 'Test User', email: 'test@test.com' })

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
      <HomePage user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />
    </div>
  )
}

export default App
