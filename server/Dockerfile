FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Add wait-for script to check for PostgreSQL
ADD https://raw.githubusercontent.com/eficode/wait-for/master/wait-for /wait-for
RUN chmod +x /wait-for

# Wait for PostgreSQL and start the application
CMD ["/bin/sh", "-c", "/wait-for ${POSTGRES_HOST}:${POSTGRES_PORT} -- node src/index.js"]