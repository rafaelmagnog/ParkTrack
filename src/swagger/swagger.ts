// src/swagger/swagger.ts
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

export function setupSwagger(app: Express) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "ParkTrack API",
        version: "1.0.0",
        description:
          "API para gerenciamento de clientes, veículos e estacionamentos",
      },
      servers: [
        { url: "http://localhost:3333", description: "Ambiente Local" },
      ],
      tags: [
        { name: "Clientes", description: "Gestão de clientes" },
        { name: "Veiculos", description: "Gestão de veículos" },
        { name: "Estacionamentos", description: "Registros de estacionamento" },
      ],
      components: {
        parameters: {
          IdParam: {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "Identificador numérico do recurso",
          },
        },
        schemas: {
          Cliente: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              nome: { type: "string", example: "João Silva" },
              telefone: { type: "string", example: "11999999999" },
              cpf: { type: "string", example: "12345678901" },
            },
          },
          SuccessMessage: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Recurso removido com sucesso",
              },
              id: { type: "integer", example: 1 },
            },
          },
          ClienteCreate: {
            type: "object",
            required: ["nome", "telefone", "cpf"],
            properties: {
              nome: { type: "string", example: "João Silva" },
              telefone: { type: "string", example: "11999999999" },
              cpf: { type: "string", example: "12345678901" },
            },
          },
          ClienteUpdate: {
            type: "object",
            properties: {
              nome: { type: "string", example: "Maria Souza" },
              telefone: { type: "string", example: "11888887777" },
              cpf: { type: "string", example: "12345678901" },
            },
          },
          Veiculo: {
            type: "object",
            properties: {
              id: { type: "integer", example: 10 },
              placa: { type: "string", example: "ABC1D23" },
              modelo: { type: "string", example: "Fiat Argo" },
              cor: { type: "string", example: "Prata" },
              clienteId: { type: "integer", example: 1 },
            },
          },
          VeiculoCreate: {
            type: "object",
            required: ["placa", "modelo", "cor", "clienteId"],
            properties: {
              placa: { type: "string", example: "ABC1D23" },
              modelo: { type: "string", example: "Fiat Argo" },
              cor: { type: "string", example: "Prata" },
              clienteId: { type: "integer", example: 1 },
            },
          },
          VeiculoUpdate: {
            type: "object",
            properties: {
              placa: { type: "string", example: "XYZ9Z99" },
              modelo: { type: "string", example: "Chevrolet Onix" },
              cor: { type: "string", example: "Branco" },
              clienteId: { type: "integer", example: 2 },
            },
          },
          Estacionamento: {
            type: "object",
            properties: {
              id: { type: "integer", example: 5 },
              veiculoId: { type: "integer", example: 10 },
              horaEntrada: {
                type: "string",
                format: "date-time",
                example: "2025-10-01T12:00:00Z",
              },
              horaSaida: {
                type: "string",
                format: "date-time",
                example: null,
                nullable: true,
              },
              valor: { type: "number", example: 18.75, nullable: true },
            },
          },
          EstacionamentoCreate: {
            type: "object",
            required: ["veiculoId"],
            properties: { veiculoId: { type: "integer", example: 10 } },
          },
          EstacionamentoUpdate: {
            type: "object",
            properties: {
              horaSaida: {
                type: "string",
                format: "date-time",
                example: "2025-10-01T14:30:00Z",
              },
              valor: { type: "number", example: 22.5 },
            },
          },
          EstacionamentoDetalhado: {
            allOf: [
              { $ref: "#/components/schemas/Estacionamento" },
              {
                type: "object",
                properties: {
                  vagasDisponiveis: { type: "integer", example: 12 },
                  veiculosEstacionados: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Veiculo" },
                  },
                },
              },
            ],
          },

          Error: {
            type: "object",
            properties: {
              message: { type: "string", example: "Recurso não encontrado" },
              code: { type: "string", example: "NOT_FOUND" },
              timestamp: { type: "string", format: "date-time" },
            },
          },
          ValidationError: {
            type: "object",
            properties: {
              message: { type: "string", example: "Erro de validação" },
              code: { type: "string", example: "VALIDATION_ERROR" },
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    field: { type: "string", example: "placa" },
                    message: {
                      type: "string",
                      example: "Placa deve ter pelo menos 4 caracteres",
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          BadRequest: {
            description: "Erro de validação ou requisição inválida",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
          NotFound: {
            description: "Recurso não encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          Conflict: {
            description: "Conflito de dados (duplicidade)",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          NoContent: {
            description: "Operação executada com sucesso sem corpo",
          },
          InternalError: {
            description: "Erro interno do servidor",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    apis: ["./src/routes/*.ts"],
  };

  const swaggerSpec = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
