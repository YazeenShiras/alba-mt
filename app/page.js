/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "../styles/globals.module.css";

const App = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/authentication");
    } else {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className={styles.loading_container}>
      <p>Loading...</p>
    </div>
  );
};

export default App;
