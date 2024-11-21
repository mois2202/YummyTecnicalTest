# Utilizar la imagen base de Node.js
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/

# Copiar los archivos package.json y package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Instalar las dependencias en la imagen de construcción
RUN npm install

# Copiar el resto de los archivos de la app
COPY . .

# Construir la aplicación TypeScript
RUN npm run tsc

# Crear una imagen ligera para producción
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /usr/src/

# Copiar solo lo necesario desde el builder
COPY --from=builder /usr/src/dist ./dist
COPY --from=builder /usr/src/package.json ./package.json
COPY --from=builder /usr/src/node_modules ./node_modules

# Definir la variable de entorno para producción
ENV NODE_ENV production

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "start"]
