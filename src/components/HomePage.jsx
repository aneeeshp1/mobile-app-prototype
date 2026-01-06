import { useState } from 'react'
import '../styles/HomePage.css';
import ProfilePanel from './ProfilePanel'

export default function HomePage({ user, onLogout, onUpdateUser }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()

  const openProfile = () => setIsProfileOpen(true)
  const closeProfile = () => setIsProfileOpen(false)

  return (
    <div className="home-container">
      <div className="mobile-frame">
        <div className="app-header">
          <div className="app-brand">
            <div className="app-logo" aria-hidden>📅</div>
            <div className="app-title">My Calendar</div>
          </div>
          <button className="profile-icon" onClick={openProfile} aria-label="Open profile">
            <span className="profile-initials">{initials}</span>
          </button>
        </div>


        <div className="home-content">
          <div className="feature-card">
            <div className="card-icon">🎨</div>
            <h3>Modern Design</h3>
            <p>Clean and intuitive user interface</p>
          </div>

          <div className="feature-card">
            <div className="card-icon">📱</div>
            <h3>Mobile First</h3>
            <p>Optimized for all mobile devices</p>
          </div>

          <div className="feature-card">
            <div className="card-icon">⚡</div>
            <h3>Fast & Responsive</h3>
            <p>Smooth interactions and animations</p>
          </div>

          <div className="feature-card">
            <div className="card-icon">🔒</div>
            <h3>Secure</h3>
            <p>Protected with authentication</p>
          </div>
        </div>

        <div className="home-footer">
          <p>User: {user.email}</p>
          <button className="logout-button" onClick={onLogout}>
            Sign Out
          </button>
        </div>

        {/* Overlay and profile panel */}
        <div className={`panel-overlay ${isProfileOpen ? 'open' : ''}`} onClick={closeProfile} aria-hidden={!isProfileOpen}></div>
        <ProfilePanel user={user} isOpen={isProfileOpen} onClose={closeProfile} onUpdateUser={onUpdateUser} />
      </div>
    </div>
  );
}
