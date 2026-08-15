import { useState } from 'react';

function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? 'login' : 'signup';

    try {
      const res = await fetch(`http://localhost:5000/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        onLoginSuccess(data.username);
      } else {
        setError('');
        setIsLogin(true);
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      setError('Could not connect to server');
    }
  };

  return (
    <div className="auth-container">
      <h1>📋 Task Dashboard</h1>
      <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
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
        <span onClick={() => { setIsLogin(!isLogin); setError(''); }}>
          {isLogin ? 'Sign Up' : 'Log In'}
        </span>
      </p>
    </div>
  );
}

export default Auth;
