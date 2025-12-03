/**
 * Configuração da API
 * URL base varia conforme ambiente (dev/prod).
 */

/**
 * Retorna a URL base da API de acordo com o ambiente.
 * Prioridade: VITE_API_URL > produção (vazio) > localhost
 */
export const getApiUrl = (): string => {
  // Se tiver variável de ambiente configurada, usa ela
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Em produção sem variável definida, usa URL relativa
  if (import.meta.env.PROD) {
    return "";
  }

  // Em desenvolvimento, conecta no backend local
  return "http://localhost:3333";
};

export const API_BASE_URL = getApiUrl();

// Endpoints da API
export const API_ENDPOINTS = {
  CLIENTES: `${API_BASE_URL}/clientes`,
  VEICULOS: `${API_BASE_URL}/veiculos`,
  ESTACIONAMENTOS: `${API_BASE_URL}/estacionamentos`,
};
