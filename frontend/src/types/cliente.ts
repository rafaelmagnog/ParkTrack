/**
 * Tipos TypeScript para Cliente
 *
 * Define a estrutura de dados do cliente e tipos auxiliares
 * para criação e atualização.
 */

/** Representa um cliente cadastrado no sistema */
export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  cpf: string;
}

/** Dados necessários para criar um cliente (sem id) */
export type CreateClienteInput = Omit<Cliente, "id">;

/** Dados para atualização - todos os campos são opcionais */
export type UpdateClienteInput = Partial<CreateClienteInput>;
