import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('claribot_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('claribot_user', JSON.stringify(userData));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('claribot_user');
    } catch {}
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};


