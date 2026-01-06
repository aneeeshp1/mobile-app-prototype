import '../styles/HomePage.css';

export default function HomePage({ user, onLogout }) {
  return (
    <div className="home-container">
      <div className="mobile-frame">
        <div className="status-bar">
          <span className="time">9:41</span>
        </div>

        <div className="home-header">
          <h1>Welcome, {user.name}!</h1>
          <p>Mobile App Prototype</p>
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
      </div>
    </div>
  );
}
