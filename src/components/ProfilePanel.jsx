import { useState, useEffect } from 'react'
import '../styles/ProfilePanel.css'

export default function ProfilePanel({ user, isOpen, onClose, onUpdateUser, onLogout }) {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('johndoe@example.com')
  const [isEditing, setIsEditing] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    // Reset to view mode each time panel opens
    setIsEditing(false)
    setName('John Doe')
    setEmail('johndoe@example.com')
  }, [user, isOpen])

  const handleSave = (e) => {
    e.preventDefault()
    // Basic validation
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setMessage({ type: 'error', text: 'New passwords do not match.' })
        return
      }
      if (newPassword.length < 6) {
        setMessage({ type: 'error', text: 'New password must be at least 6 characters.' })
        return
      }
      // In a real app, we'd verify currentPassword and submit to backend
      setMessage({ type: 'success', text: 'Password changed (simulated).' })
      // We can signal password change to parent if desired
      onUpdateUser({ passwordChanged: true })
    }

    // Update name and email
    onUpdateUser({ name: name.trim(), email: email.trim() })
    setMessage({ type: 'success', text: 'Profile updated.' })

    // Optionally close after saving
    setTimeout(() => {
      setMessage(null)
      onClose()
    }, 800)
  }

  const handleClose = () => {
    setMessage(null)
    onClose()
  }

  return (
    <div className={`profile-panel ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="panel-header">
        <h2>{isEditing ? 'Edit Profile' : 'Profile'}</h2>
        <button className="close-btn" onClick={handleClose} aria-label="Close profile panel">✕</button>
      </div>

      {!isEditing ? (
        <div className="panel-form" role="region" aria-label="Profile summary">
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <div style={{width:48,height:48,borderRadius:'50%',overflow:'hidden',boxShadow:'0 2px 6px rgba(0,0,0,0.12)'}}>
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`}
                alt={`${name}'s avatar`}
                style={{width:'100%',height:'100%',objectFit:'cover'}}
              />
            </div>
            <div>
              <div style={{fontWeight:600,color:'#111'}}>{name}</div>
              <div style={{fontSize:13,color:'#555'}}>{email}</div>
            </div>
          </div>

          <div className="panel-actions">
            <button type="button" className="btn primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
            <button type="button" className="btn secondary" onClick={onLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <form className="panel-form" onSubmit={handleSave}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <div className="divider">Change Password</div>

          <label>
            Current Password
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </label>

          <label>
            New Password
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </label>

          <label>
            Confirm New Password
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>

          {message && <div className={`message ${message.type}`}>{message.text}</div>}

          <div className="panel-actions">
            <button type="submit" className="btn primary">Save</button>
            <button type="button" className="btn secondary" onClick={() => setIsEditing(false)}>Back</button>
          </div>
        </form>
      )}
    </div>
  )
}
