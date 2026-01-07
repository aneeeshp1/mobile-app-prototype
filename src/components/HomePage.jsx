import { useState } from 'react'
import '../styles/HomePage.css';
import ProfilePanel from './ProfilePanel'
import Calendar from './Calendar'

export default function HomePage({ user, onLogout, onUpdateUser }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()

  const openProfile = () => setIsProfileOpen(true)
  const closeProfile = () => setIsProfileOpen(false)
  const [calendarMode, setCalendarMode] = useState('lunar') // 'gregorian' | 'lunar'
  const [viewMode, setViewMode] = useState('month') // 'month' | 'week'
  const [selectedDay, setSelectedDay] = useState(null)

  const handleDayClick = (date) => {
    setSelectedDay(date)
    setViewMode('week')
  }

  const handleBackToCalendar = () => {
    setViewMode('month')
  }

  const handleDayNavigation = (direction) => {
    if (selectedDay) {
      const newDate = new Date(selectedDay)
      newDate.setDate(newDate.getDate() + direction)
      setSelectedDay(newDate)
    }
  }

  return (
    <div className="home-container">
      <div className="mobile-frame">
        <div className="app-header">
          <div className="app-brand">
            <div className="brand-left">
              <div className="profile-row">
                <button className="profile-icon" onClick={openProfile} aria-label="Open profile">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                    alt={`${user.name}'s avatar`}
                    className="profile-avatar"
                  />
                </button>
                <div className="app-title">Calendar</div>
              </div>
              <div className="header-tabs">
                <div className="calendar-tabs">
                  <button
                    className={`tab-btn ${calendarMode === 'lunar' ? 'active' : ''}`}
                    onClick={() => setCalendarMode('lunar')}
                    aria-pressed={calendarMode === 'lunar'}
                  >
                    Lunar
                  </button>
                  <button
                    className={`tab-btn ${calendarMode === 'gregorian' ? 'active' : ''}`}
                    onClick={() => setCalendarMode('gregorian')}
                    aria-pressed={calendarMode === 'gregorian'}
                  >
                    Gregorian
                  </button>
                </div>
              </div>
            </div>
            <div className="brand-right">
              <div className="view-tabs">
                <button
                  className={`tab-btn ${viewMode === 'month' ? 'active' : ''}`}
                  onClick={() => setViewMode('month')}
                  aria-pressed={viewMode === 'month'}
                >
                  Month
                </button>
                <button
                  className={`tab-btn ${viewMode === 'week' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('week')
                    if (!selectedDay) setSelectedDay(new Date())
                  }}
                  aria-pressed={viewMode === 'week'}
                >
                  Week
                </button>
              </div>
              <button className="notification-icon" aria-label="Notifications">
                <span className="bell-emoji">🔔</span>
              </button>
            </div>
          </div>
        </div>

        <div className="home-content">
          {/* Calendar component */}
          <div className="calendar-container">
            <Calendar 
              mode={calendarMode} 
              setMode={setCalendarMode}
              viewMode={viewMode}
              onDayClick={handleDayClick}
              selectedDay={selectedDay}
              onBackToCalendar={handleBackToCalendar}
              onDayNavigation={handleDayNavigation}
            />
          </div>
        </div>

        {/* Overlay and profile panel */}
        <div className={`panel-overlay ${isProfileOpen ? 'open' : ''}`} onClick={closeProfile} aria-hidden={!isProfileOpen}></div>
        <ProfilePanel user={user} isOpen={isProfileOpen} onClose={closeProfile} onUpdateUser={onUpdateUser} onLogout={onLogout} />
      </div>
    </div>
  );
}
