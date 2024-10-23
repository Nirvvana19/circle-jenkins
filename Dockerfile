# Etapa 1: Imagen base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código de la aplicación al contenedor
COPY . .

# Expone el puerto en el que corre la aplicación (según el puerto en tu app)
EXPOSE 3600

# Define el comando para correr la aplicación
CMD ["node", "app.js"]
