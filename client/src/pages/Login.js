import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import './Auth.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isLoading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  }
  return (
    <form onSubmit={handleSubmit} className="login">
      <h2>Login</h2>
      <div className="username">
        <label>Username:</label>
        <input
          type="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Enter username"
        />
      </div>
      <div className="password">
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter password"
        />
      </div>
      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Login;
