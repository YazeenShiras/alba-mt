"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const App = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/authentication");
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  return <p>Loading...</p>;
};

export default App;
