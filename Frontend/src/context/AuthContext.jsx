import { createContext, useState, useEffect } from "react";
import { loginUser, signupUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Basic check for token on load
    const token = localStorage.getItem("token");
    if (token) {
      // In a real app we would verify token with /api/auth/me
      // For now we just assume logged in if token exists
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await loginUser({ email, password });
    localStorage.setItem("token", data.token);
    setUser({ token: data.token });
  };

  const signup = async (name, email, password) => {
    const { data } = await signupUser({ name, email, password });
    localStorage.setItem("token", data.token);
    setUser({ token: data.token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
