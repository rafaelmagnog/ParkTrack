-- DropForeignKey
ALTER TABLE "public"."Estacionamento" DROP CONSTRAINT "Estacionamento_veiculoId_fkey";

-- AlterTable
ALTER TABLE "Estacionamento" ADD COLUMN     "veiculoSnapshot" JSONB,
ALTER COLUMN "veiculoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Estacionamento" ADD CONSTRAINT "Estacionamento_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
