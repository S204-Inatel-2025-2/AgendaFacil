import React, { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/AuthService';
import type { User, Empresa, LoginRequest, RegisterRequest } from '../services/AuthService';

// Tipo união para representar tanto User quanto Empresa
type AuthUser = (User & { userType: 'user' }) | (Empresa & { userType: 'empresa' });

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isEmpresa: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  loginEmpresa: (email: string, senha: string) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User | Empresa>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, senha });
      
      if (response.error) {
        console.error('Erro no login:', response.error);
        return false;
      }
      
      if (response.data) {
        const userWithType = { ...response.data, userType: 'user' as const };
        setUser(userWithType);
        localStorage.setItem('user', JSON.stringify(userWithType));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro inesperado no login:', error);
      return false;
    }
  };

  const loginEmpresa = async (email: string, senha: string): Promise<boolean> => {
    try {
      const response = await authService.loginEmpresa({ email, senha });
      
      if (response.error) {
        console.error('Erro no login da empresa:', response.error);
        return false;
      }
      
      if (response.data) {
        const empresaWithType = { ...response.data, userType: 'empresa' as const };
        setUser(empresaWithType);
        localStorage.setItem('user', JSON.stringify(empresaWithType));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro inesperado no login da empresa:', error);
      return false;
    }
  };

  const register = async (userData: RegisterRequest): Promise<boolean> => {
    try {
      const response = await authService.register(userData);
      
      if (response.error) {
        console.error('Erro no cadastro:', response.error);
        return false;
      }
      
      if (response.data) {
        const userWithType = { ...response.data, userType: 'user' as const };
        setUser(userWithType);
        localStorage.setItem('user', JSON.stringify(userWithType));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro inesperado no cadastro:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User | Empresa>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isEmpresa: user?.userType === 'empresa',
    login,
    loginEmpresa,
    register,
    logout,
    updateUser,
  };

  return React.createElement(
    AuthContext.Provider,
    { value },
    children
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}