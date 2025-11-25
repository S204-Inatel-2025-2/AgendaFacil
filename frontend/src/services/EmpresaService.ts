const API_BASE_URL = '/api';

export interface EmpresaDetalhada {
  servicos: boolean;
  id: number;
  nome: string;
  razao_social: string;
  cnpj: string;
  email: string;
  telefone: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class EmpresaService {
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
        throw new Error(errorData.message || `Erro ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  async buscarPorId(id: number): Promise<ApiResponse<EmpresaDetalhada>> {
    return this.request<EmpresaDetalhada>(`/empresas/${id}`);
  }

  async listarTodas(): Promise<ApiResponse<EmpresaDetalhada[]>> {
    return this.request<EmpresaDetalhada[]>('/empresas');
  }
}

export const empresaService = new EmpresaService();