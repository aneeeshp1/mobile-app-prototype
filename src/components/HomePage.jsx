import { useState } from 'react'
import '../styles/HomePage.css';
import ProfilePanel from './ProfilePanel'
import Calendar from './Calendar'

export default function HomePage({ user, onLogout, onUpdateUser }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()

  const openProfile = () => setIsProfileOpen(true)
  const closeProfile = () => setIsProfileOpen(false)
  const [calendarMode, setCalendarMode] = useState('gregorian') // 'gregorian' | 'lunar'

  return (
    <div className="home-container">
      <div className="mobile-frame">
        <div className="app-header">
          <div className="app-brand">
            <div className="app-logo" aria-hidden>📅</div>
            <div className="app-title">My Calendar</div>
          </div>

          <div className="header-controls">
            <button
              className={`calendar-toggle-switch ${calendarMode === 'lunar' ? 'lunar' : 'gregorian'}`}
              onClick={() => setCalendarMode(prev => prev === 'gregorian' ? 'lunar' : 'gregorian')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCalendarMode(prev => prev === 'gregorian' ? 'lunar' : 'gregorian') } }}
              role="switch"
              aria-checked={calendarMode === 'lunar'}
              aria-label="Toggle calendar view"
              title={calendarMode === 'lunar' ? 'Lunar calendar' : 'Gregorian calendar'}
            >
              <span className="toggle-icon sun" aria-hidden>☀️</span>
              <span className="toggle-track" aria-hidden>
                <span className={`toggle-knob ${calendarMode === 'lunar' ? 'right' : 'left'}`}></span>
              </span>
              <span className="toggle-icon moon" aria-hidden>🌙</span>
            </button>

            <button className="profile-icon" onClick={openProfile} aria-label="Open profile">
              <span className="profile-initials">{initials}</span>
            </button>
          </div>
        </div>


        <div className="home-content">
          {/* Calendar component */}
          <div className="calendar-container">
            <Calendar mode={calendarMode} setMode={setCalendarMode} />
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
