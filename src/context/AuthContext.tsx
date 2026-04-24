"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MOCK_USERS, type AppRole, type User } from "../lib/mockData";

type AuthContextType = {
  user: User | null;
  users: User[];
  login: (iin: string, password: string) => string | null;
  register: (name: string, iin: string, phone: string, password: string) => string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  useEffect(() => {
    const stored = window.localStorage.getItem("agritrack-user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("agritrack-user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("agritrack-user");
    }
  }, [user]);

  const login = (iin: string, password: string) => {
    if (password !== "password123") {
      return "Неверный пароль";
    }

    const existing = users.find((item) => item.iin === iin);
    if (existing) {
      setUser(existing);
      return null;
    }

    const newUser: User = {
      iin,
      name: "Новый пользователь",
      role: "user",
      phone: "+77000000000",
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return null;
  };

  const register = (name: string, iin: string, phone: string, password: string) => {
    if (password !== "password123") {
      return "Неверный пароль";
    }

    if (!name || !iin || !phone) {
      return "Пожалуйста, заполните все поля";
    }

    const existing = users.find((item) => item.iin === iin);
    if (existing) {
      setUser(existing);
      return null;
    }

    const newUser: User = {
      iin,
      name,
      role: "user",
      phone,
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, users, login, register, logout }),
    [user, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
