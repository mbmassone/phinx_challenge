# Usa la imagen base de Ubuntu 24.04
FROM ubuntu:24.04

# Actualiza el sistema e instala las dependencias necesarias
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    ca-certificates \
    lsb-release \
    software-properties-common

# Agrega el repositorio de NodeSource para instalar Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

# Instala Node.js y npm
RUN apt-get install -y nodejs

# Verifica la instalación de Node.js y npm
RUN node -v && npm -v

# Instala el CLI de Nest.js globalmente
RUN npm i -g @nestjs/cli

# Crea un directorio de trabajo
WORKDIR /backend/backend

# Expone el puerto 3000 (o el puerto que uses en tu aplicación Nest.js)
EXPOSE 3000

# Comando por defecto para correr la aplicación
# CMD ["sh", "-c", "npm install && npm install @nestjs/typeorm typeorm sqlite3 && npm run start --watch"]