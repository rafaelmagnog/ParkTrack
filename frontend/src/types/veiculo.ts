import type { Cliente } from "./cliente";

export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  cor: string;
  clienteId: number;
  cliente?: Cliente;
}

export type CreateVeiculoInput = Omit<Veiculo, "id" | "cliente">;
export type UpdateVeiculoInput = Partial<CreateVeiculoInput>;
