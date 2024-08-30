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

# Crea un directorio de trabajo
WORKDIR /frontend

# Comando por defecto para correr la aplicación
CMD npm install && npm run build && npm run start