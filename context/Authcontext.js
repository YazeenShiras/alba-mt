"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
    <AuthContext.Provider value={{ user, token, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
