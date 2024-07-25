"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import AuthContext from "@/context/Authcontext";

import styles from "../../styles/authentication.module.css";

const LoginPage = () => {
  const router = useRouter();

  const [isLoginPage, setLoginPage] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { apiUrl, setUser } = useContext(AuthContext);

  const register = (username, password) => {
    fetch(`${apiUrl}/api/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setLoginPage(true);
          setUserName("");
          setPassword("");
          setError("");
        } else {
          setError("Username already exists!");
        }
      });
  };

  const login = (username, password) => {
    fetch(`${apiUrl}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.data._id);
        setUser(data.data);
        router.push("/dashboard");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginPage) {
      login(username, password);
    } else {
      register(username, password);
    }
  };

  return (
    <>
      {isLoginPage ? (
        <div className={styles.container}>
          <h1>Admin Login</h1>
          <form onSubmit={handleSubmit} className={styles.form_container}>
            <div className={styles.input_container}>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_container}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className={styles.login_button} type="submit">
              Login
            </button>
            <div className={styles.not_registered_container}>
              Not registered?{" "}
              <span onClick={() => setLoginPage(false)}>Register</span>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.container}>
          <h1>Admin Register</h1>
          <form onSubmit={handleSubmit} className={styles.form_container}>
            <div className={styles.input_container}>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_container}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className={styles.login_button} type="submit">
              Register
            </button>
            {error !== "" && <p className={styles.error}>{error}</p>}
            <div className={styles.not_registered_container}>
              Already registered?{" "}
              <span onClick={() => setLoginPage(true)}>Login</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
