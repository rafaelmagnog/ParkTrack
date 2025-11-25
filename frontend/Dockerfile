# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copia apenas arquivos de dependências primeiro (melhora cache)
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia o restante do código
COPY . .

# Define variável de ambiente para a API (pode ser sobrescrita no docker-compose)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build da aplicação
RUN npm run build

# Production stage - Nginx para servir arquivos estáticos
FROM nginx:alpine

# Copia configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia arquivos buildados do stage anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe porta 80
EXPOSE 80

# Comando padrão
CMD ["nginx", "-g", "daemon off;"]
