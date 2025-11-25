import React, { useState, useEffect, createContext, useContext, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/AuthService';
import type { User, RegisterRequest } from '../services/AuthService';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  loginWithGoogle: () => void;
  logout: () => void;
  checkOAuth2Session: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasCheckedOAuth2Ref = useRef(false);

  const checkOAuth2Session = useCallback(async (showToast = false) => {
    try {
      const response = await authService.checkOAuth2Status();
      
      if (response.data && (response.data as any).authenticated) {
        // Se autenticado via OAuth2, buscar dados completos do usuário
        const userResponse = await authService.getOAuth2User();
        if (userResponse.data && (userResponse.data as any).authenticated) {
          const userData = userResponse.data as any;
          const user: User = {
            id: userData.id,
            nome_completo: userData.name || userData.nome_completo,
            email: userData.email,
            auth_provider: userData.provider || 'GOOGLE',
          };
          
          const previousUser = localStorage.getItem('user');
          const isNewLogin = !previousUser || JSON.parse(previousUser).id !== user.id;
          
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          
          // Mostrar toast apenas se for um novo login (retorno do OAuth2)
          if (showToast && isNewLogin) {
            toast.success('🎉 Login com Google realizado com sucesso!');
          }
        }
      }
    } catch (error) {
      console.error('Erro ao verificar sessão OAuth2:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasCheckedOAuth2Ref.current) return;
    hasCheckedOAuth2Ref.current = true;

    // Verificar se acabamos de retornar do OAuth2 (backend redireciona para home)
    const urlParams = new URLSearchParams(window.location.search);
    const hasOAuth2Cookie = document.cookie.includes('JSESSIONID');
    const isOAuth2Return = urlParams.has('code') || (hasOAuth2Cookie && !localStorage.getItem('user'));
    
    // Verificar primeiro se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsLoading(false);
        // Se parece ser retorno do OAuth2, verificar sessão para sincronizar
        if (isOAuth2Return) {
          checkOAuth2Session(true).catch(() => {
            // Se falhar, manter o usuário do localStorage
          });
        }
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error);
        localStorage.removeItem('user');
        setIsLoading(false);
        // Tentar verificar sessão OAuth2
        checkOAuth2Session(isOAuth2Return);
      }
    } else {
      // Se não há usuário no localStorage, verificar sessão OAuth2
      checkOAuth2Session(isOAuth2Return);
    }
  }, [checkOAuth2Session]);

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, senha });
      
      if (response.error) {
        console.error('Erro no login:', response.error);
        return false;
      }
      
      if (response.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro inesperado no login:', error);
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
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro inesperado no cadastro:', error);
      return false;
    }
  };

  const loginWithGoogle = () => {
    authService.loginWithGoogle();
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    
    // Se o usuário estava logado via OAuth2, fazer logout no backend também
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    loginWithGoogle,
    logout,
    checkOAuth2Session,
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
