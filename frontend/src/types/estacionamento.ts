import type { Veiculo } from "./veiculo";

export interface Estacionamento {
  id: number;
  veiculoId: number;
  horaEntrada: string;
  horaSaida?: string | null;
  valor?: number | null;
  veiculo?: Veiculo;
}

export type CreateEstacionamentoInput = {
  veiculoId: number;
};

export type UpdateEstacionamentoInput = {
  horaSaida?: string;
  valor?: number;
};
