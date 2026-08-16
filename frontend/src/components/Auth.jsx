import { useState } from 'react';
import { API_URL } from '../config';



function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(username)) {
      setError('Please enter a valid email address');
      return;
    }

    const endpoint = isLogin ? 'login' : 'signup';

    try {
     const res = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('name', data.name);
        onLoginSuccess(data.name);
      } else {
        setError('');
        setIsLogin(true);
        setName('');
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      setError('Could not connect to server');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-illustration">
        <div className="auth-illustration-content">
          <span className="auth-logo">📋</span>
          <h1>Task Dashboard</h1>
          <p>
            Organize your work, hit your deadlines, and stay on top of
            everything — all in one place.
          </p>
        </div>
      </div>

      <div className="auth-panel">
        <h2>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
        <p className="auth-subtitle">
          {isLogin ? 'Log in to continue' : 'Sign up to get started'}
        </p>

       <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;