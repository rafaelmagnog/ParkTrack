export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  cpf: string;
}

export type CreateClienteInput = Omit<Cliente, "id">;
export type UpdateClienteInput = Partial<CreateClienteInput>;
