const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

export interface ServicoDTO {
  nome: string;
  categoria: string;
  descricao: string;
  duracao_minutos: number;
  preco: number;
}

export interface Servico {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  duracao_minutos: number;
  preco: number;
  agendado: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ServicoService {
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

  async cadastrar(servico: ServicoDTO): Promise<ApiResponse<Servico>> {
    return this.request<Servico>('/servicos/cadastrar', {
      method: 'POST',
      body: JSON.stringify(servico),
    });
  }

  async cadastrarMultiplos(servicos: ServicoDTO[]): Promise<ApiResponse<Servico[]>> {
    const promises = servicos.map(servico => this.cadastrar(servico));
    const results = await Promise.all(promises);
    
    const errors = results.filter(r => r.error);
    if (errors.length > 0) {
      return {
        error: `Erro ao cadastrar ${errors.length} de ${servicos.length} serviços`,
      };
    }

    const data = results.map(r => r.data!).filter(Boolean);
    return { data };
  }

  async listar(): Promise<ApiResponse<Servico[]>> {
    return this.request<Servico[]>('/servicos');
  }

  async buscarPorId(id: number): Promise<ApiResponse<Servico>> {
    return this.request<Servico>(`/servicos/${id}`);
  }

  async buscarPorCategoria(categoria: string): Promise<ApiResponse<Servico[]>> {
    return this.request<Servico[]>(`/servicos/categoria/${categoria}`);
  }

  async deletar(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/servicos/${id}`, {
      method: 'DELETE',
    });
  }
}

export const servicoService = new ServicoService();

