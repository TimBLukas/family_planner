import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [loginData] = useState([
    { name: 'admin', password: 'admin' },
    { name: 'tim', password: 'tim' },
  ]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const username = data.get('username');
    const password = data.get('password');

    const user = loginData.find(
      (user) => user.name === username && user.password === password
    );

    if (user) {
      console.log("Logged in");
      setError(false);
      navigate('/dashboard');
    } else {
      setError(true);
      // Reset error state after animation completes
      setTimeout(() => setError(false), 1000);
    }
  }

  return (
    <div className="login-body">
      <div className="login-container">
        <h1 className="login-label">Login</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="username-container">
            <label htmlFor="username" className="input-field-description">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={error ? 'error-shake' : ''}
            />
          </div>

          <div className="password-container">
            <label htmlFor="password" className="input-field-description">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={error ? 'error-shake' : ''}
            />
          </div>

          {error && (
            <div className="error-message">
              Invalid username or password
            </div>
          )}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;