# ================================
#  Etapa 1 — Build da aplicação
# ================================
FROM node:20-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências (usando ci para builds reprodutíveis)
RUN npm ci

# Copia o restante do código-fonte
COPY . .

# Gera o build de produção (saída em /app/dist)
RUN npm run build



# ================================
#  Etapa 2 — Servindo com Nginx
# ================================
FROM nginx:alpine

# Remove o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados pelo build
COPY --from=build /app/dist /usr/share/nginx/html

# Copia o arquivo de configuração customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 (onde o Nginx servirá a aplicação)
EXPOSE 80

# Mantém o Nginx rodando em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
