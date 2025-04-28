
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if we have a user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);
  
  // Mock login function - in a real app, this would call your authentication API
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, validate credentials with backend
      // For demo, just check if email is admin@smc.edu and password is "admin"
      if (email === 'admin@smc.edu' && password === 'admin') {
        const userData: User = {
          id: 'admin-user',
          email,
          name: 'Admin User',
          isAdmin: true,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else if (email && password) {
        // Any other email/password combo logs in as a regular user
        const userData: User = {
          id: 'regular-user-' + Math.random().toString(36).substring(2, 9),
          email,
          name: 'Student User',
          isAdmin: false,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAdmin: !!user?.isAdmin,
    login,
    logout,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
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
