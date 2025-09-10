import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Types for user and authentication
interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'email';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('saheli-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('saheli-user');
      }
    }
    setIsLoading(false);
  }, []);

  // Regular email/password login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call - in real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        provider: 'email'
      };
      
      setUser(mockUser);
      localStorage.setItem('saheli-user', JSON.stringify(mockUser));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to Saheli!",
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Google authentication
  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, you'd integrate with Google OAuth
      // For demo purposes, we'll simulate Google login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockGoogleUser: User = {
        id: `google_${Date.now()}`,
        email: 'user@gmail.com',
        name: 'Google User',
        picture: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
        provider: 'google'
      };
      
      setUser(mockGoogleUser);
      localStorage.setItem('saheli-user', JSON.stringify(mockGoogleUser));
      
      toast({
        title: "Google Login Successful",
        description: "Welcome to Saheli!",
      });
      
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        variant: "destructive",
        title: "Google Login Failed",
        description: "Failed to authenticate with Google. Please try again.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register new user
  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        provider: 'email'
      };
      
      setUser(newUser);
      localStorage.setItem('saheli-user', JSON.stringify(newUser));
      
      toast({
        title: "Registration Successful",
        description: "Welcome to Saheli! Your account has been created.",
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "Failed to create account. Please try again.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('saheli-user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
