/**
 * Tipos TypeScript para Veículo
 *
 * Define a estrutura de dados do veículo e seu relacionamento
 * com cliente. Inclui tipos para criação e atualização.
 */

import type { Cliente } from "./cliente";

/** Representa um veículo cadastrado no sistema */
export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  cor: string;
  clienteId: number;
  cliente?: Cliente; // Relacionamento opcional (incluído em algumas respostas)
}

/** Dados para criar veículo - sem id e sem objeto cliente */
export type CreateVeiculoInput = Omit<Veiculo, "id" | "cliente">;

/** Dados para atualização - todos os campos são opcionais */
export type UpdateVeiculoInput = Partial<CreateVeiculoInput>;
