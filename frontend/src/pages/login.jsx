import React, { useState } from "react";
import { login } from "../service/api";
import { setAuth } from "../Utils/auth";
import { useNavigate, Link } from "react-router-dom";
import styles from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(form);
      setAuth({
        token: res.token,
        user: res.user,
      });

      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button type="submit">Login</button>

        <p>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
