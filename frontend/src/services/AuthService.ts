const API_BASE_URL = '/api';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome_completo: string;
  email: string;
  telefone: string;
  senha: string;
}

export interface User {
  id: number;
  nome_completo: string;
  email: string;
  telefone?: string;
  senha?: string;
  auth_provider?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class AuthService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<User>> {
    return this.request<User>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<User>> {
    return this.request<User>('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async checkOAuth2Status(): Promise<ApiResponse<User>> {
    return this.request<User>('/oauth2/status', {
      method: 'GET',
      credentials: 'include', // Importante para enviar cookies de sessão
    });
  }

  async getOAuth2User(): Promise<ApiResponse<User>> {
    return this.request<User>('/oauth2/user', {
      method: 'GET',
      credentials: 'include',
    });
  }

  loginWithGoogle(): void {
    window.location.href = '/api/oauth2/authorization/google';
  }
}

export const authService = new AuthService();