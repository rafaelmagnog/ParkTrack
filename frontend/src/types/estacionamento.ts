import type { Veiculo } from "./veiculo";

// Snapshot do veículo armazenado quando o veículo é deletado
export interface VeiculoSnapshot {
  placa: string;
  modelo: string;
  cor: string;
  clienteNome: string;
}

export interface Estacionamento {
  id: number;
  veiculoId: number | null;
  horaEntrada: string;
  horaSaida?: string | null;
  valor?: number | null;
  veiculo?: Veiculo | null;
  veiculoSnapshot?: VeiculoSnapshot | null;
}

export type CreateEstacionamentoInput = {
  veiculoId: number;
};

export type UpdateEstacionamentoInput = {
  horaSaida?: string;
  valor?: number;
};
