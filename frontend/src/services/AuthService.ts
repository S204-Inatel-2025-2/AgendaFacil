const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

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

export interface EmpresaRegisterRequest {
  nome?: string;
  razao_social?: string;
  cnpj: string;
  email: string;
  telefone?: string;
  senha: string;
}

export interface User {
  id: number;
  nome_completo: string;
  email: string;
  telefone: string;
  senha: string;
}

export interface Empresa {
  id: number;
  nome: string;
  razao_social: string;
  cnpj: string;
  email: string;
  telefone: string;
}

export interface EmpresaDTO {
  cnpj: string;
  nome?: string;
  razao_social?: string;
  email?: string;
  telefone?: string;
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

  // consulta o cnpj na brasilapi
  async consultarCNPJ(cnpj: string): Promise<ApiResponse<EmpresaDTO>> {
    return this.request<EmpresaDTO>(`/empresas/cnpj/${cnpj}`, {
      method: 'GET',
    });
  }

  // cadastra a empresa com os dados
  async registerEmpresa(empresaData: EmpresaRegisterRequest): Promise<ApiResponse<Empresa>> {
    return this.request<Empresa>('/empresas/cadastrar', {
      method: 'POST',
      body: JSON.stringify(empresaData),
    });
  }
}

export const authService = new AuthService();