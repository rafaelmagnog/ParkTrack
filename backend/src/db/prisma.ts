/**
 * Prisma Client
 * Instância única compartilhada em toda a aplicação.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
