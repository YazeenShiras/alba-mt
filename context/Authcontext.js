"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refresh, setRefresh] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/authentication");
  };

  return (
    <AuthContext.Provider
      value={{ apiUrl, user, token, setUser, refresh, setRefresh, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
