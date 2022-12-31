import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import './Auth.css'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {signup, error, isLoading} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, password);
  }
  return (
    <form onSubmit={handleSubmit} className="signup">
      <h2>Sign up</h2>
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
      <button className="submit-button" disabled={isLoading}>Signup</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Signup;
