import { useState } from 'react';
import '../styles/LoginForm.css';

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      if (email && password.length >= 6) {
        onLoginSuccess({
          email,
          name: email.split('@')[0]
        });
      } else {
        setError('Invalid credentials. Try any email and password (min 6 chars)');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-form-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h1>Mobile App</h1>
          <p>Welcome to the prototype</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo: Use any email and password (min 6 characters)</p>
        </div>
      </div>
    </div>
  );
}
