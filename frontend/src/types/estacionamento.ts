/**
 * Tipos TypeScript para Estacionamento
 *
 * Define estrutura de registro de estacionamento.
 * Inclui VeiculoSnapshot para manter dados mesmo após exclusão do veículo.
 */

import type { Veiculo } from "./veiculo";

/**
 * Snapshot do veículo - armazenado quando o veículo é deletado.
 * Preserva o histórico nos registros finalizados.
 */
export interface VeiculoSnapshot {
  placa: string;
  modelo: string;
  cor: string;
  clienteNome: string;
}

/** Representa um registro de estacionamento (entrada/saída) */
export interface Estacionamento {
  id: number;
  veiculoId: number | null; // Null se veículo foi deletado
  horaEntrada: string;
  horaSaida?: string | null; // Preenchido ao finalizar
  valor?: number | null; // Valor cobrado ao finalizar
  veiculo?: Veiculo | null; // Relacionamento com veículo atual
  veiculoSnapshot?: VeiculoSnapshot | null; // Dados históricos se veículo deletado
}

/** Dados para registrar entrada - só precisa do veículo */
export type CreateEstacionamentoInput = {
  veiculoId: number;
};

/** Dados para finalizar - horaSaida e valor calculado */
export type UpdateEstacionamentoInput = {
  horaSaida?: string;
  valor?: number;
};
