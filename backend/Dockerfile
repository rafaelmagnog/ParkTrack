# Utiliza imagem base leve do Node
FROM node:18-alpine

# Instala OpenSSL (necessário para Prisma)
RUN apk add --no-cache openssl

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (melhora cache)
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gera cliente Prisma (necessário antes de buildar)
RUN npx prisma generate

# Compila o TypeScript para JavaScript (modo produção)
RUN npm run build

# Expõe a porta (Render usa PORT env var, padrão 10000)
EXPOSE 10000

# Comando padrão de inicialização
CMD ["npm", "start"]
