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
        description: "API do sistema de estacionamento - ParkTrack",
      },
      servers: [{ url: "http://localhost:3333" }],
      components: {
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
          ClienteCreate: {
            type: "object",
            required: ["nome", "telefone", "cpf"],
            properties: {
              nome: { type: "string", example: "João Silva" },
              telefone: { type: "string", example: "11999999999" },
              cpf: { type: "string", example: "12345678901" },
            },
          },
          Veiculo: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              placa: { type: "string", example: "ABC1234" },
              modelo: { type: "string", example: "Gol" },
              cor: { type: "string", example: "Prata" },
              clienteId: { type: "integer", example: 1 },
            },
          },
          VeiculoCreate: {
            type: "object",
            required: ["placa", "modelo", "cor", "clienteId"],
            properties: {
              placa: { type: "string", example: "ABC1234" },
              modelo: { type: "string", example: "Gol" },
              cor: { type: "string", example: "Prata" },
              clienteId: { type: "integer", example: 1 },
            },
          },
          Estacionamento: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              veiculoId: { type: "integer", example: 1 },
              horaEntrada: {
                type: "string",
                format: "date-time",
                example: "2025-10-01T12:00:00Z",
              },
              horaSaida: {
                type: "string",
                format: "date-time",
                example: "2025-10-01T14:30:00Z",
                nullable: true,
              },
              valor: { type: "number", example: 12.5, nullable: true },
            },
          },
          EstacionamentoCreate: {
            type: "object",
            required: ["veiculoId"],
            properties: {
              veiculoId: { type: "integer", example: 1 },
            },
          },
          EstacionamentoUpdate: {
            type: "object",
            properties: {
              horaSaida: { type: "string", format: "date-time" },
              valor: { type: "number" },
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
