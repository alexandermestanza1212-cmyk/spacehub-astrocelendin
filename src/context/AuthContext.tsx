// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  email: string;
  password: string;
  profilePhoto?: string;
  aboutMe?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulación de base de datos en memoria
const usersDB: User[] = [];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const register = (username: string, email: string, password: string): boolean => {
    // Verificar si el usuario ya existe
    const existingUser = usersDB.find(u => u.email === email);
    if (existingUser) {
      return false; // Usuario ya existe
    }

    // Crear nuevo usuario
    const newUser: User = {
      username,
      email,
      password,
      aboutMe: ''
    };

    usersDB.push(newUser);
    setUser(newUser);
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const foundUser = usersDB.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      // Actualizar en la "base de datos"
      const index = usersDB.findIndex(u => u.email === user.email);
      if (index !== -1) {
        usersDB[index] = updatedUser;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};