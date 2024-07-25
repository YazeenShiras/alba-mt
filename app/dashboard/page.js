/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useContext, useEffect } from "react";

import AuthContext from "../../context/Authcontext";
import PropertyList from "../../components/PropertyList";
import LeadList from "../../components/LeadList";

import styles from "../../styles/dashboard.module.css";

const Dashboard = () => {
  const { apiUrl, user, setUser, logout } = useContext(AuthContext);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`${apiUrl}/api/admin/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.data);
        });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <h1>Welcome, {user?.username}</h1>
        <button className={styles.logout_btn} onClick={logout}>
          Logout
        </button>
      </div>
      <div className={styles.main_container}>
        <PropertyList />
        <LeadList />
      </div>
    </div>
  );
};

export default Dashboard;
