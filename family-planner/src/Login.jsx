import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [loginData, setLoginData] = useState([
    {name: 'admin', password: 'admin'},
    {name: 'tim', password: 'Test'},
  ]);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const username = data.get('username');
    const password = data.get('password');

    const user = loginData.find(user => user.name === username && user.password === password);
    console.log(user.name);
    if(user != null) {
      console.log("Logged in");
      navigate('/dashboard');
    }
    document.getElementById('username').style = "border: 1px solid red";
    document.getElementById('password').style = "border: 1px solid red";
    
    
  }


  return (
    <div className="login-container">
      <h1 className="login-label">Login</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="username-container">
          <label htmlFor="username" className="input-field-description">Username</label>
          <input type="text" id="username" name="username" />
        </div>

        <div className="password-container">
          <label htmlFor="password" className="input-field-description">Password</label>
          <input type="password" id="password" name="password" />
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;