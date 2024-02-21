import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the shape of your user object
interface User {
  username: string;
}

// Define the shape of the auth context
interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (newUser: User) => {
    setUser(newUser);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
