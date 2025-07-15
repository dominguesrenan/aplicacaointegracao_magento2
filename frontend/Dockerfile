FROM node:18-alpine

WORKDIR /app

# Criar usuário node e definir permissões
RUN mkdir -p /app/node_modules/.cache && \
    chown -R node:node /app && \
    chmod -R 777 /app/node_modules

# Instalar dependências globais
RUN npm install -g @vue/cli

COPY package*.json ./

# Instalar dependências do projeto
RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["npm", "run", "serve"] 