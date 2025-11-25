/**
 * Configuração centralizada da API
 * Suporta múltiplos ambientes (dev, produção)
 */

export const getApiUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Em produção, usa URL relativa ou configurada
  if (import.meta.env.PROD) {
    return "";
  }

  // Em desenvolvimento, usa localhost
  return "http://localhost:3333";
};

export const API_BASE_URL = getApiUrl();

// URLs dos endpoints
export const API_ENDPOINTS = {
  CLIENTES: `${API_BASE_URL}/clientes`,
  VEICULOS: `${API_BASE_URL}/veiculos`,
  ESTACIONAMENTOS: `${API_BASE_URL}/estacionamentos`,
};
