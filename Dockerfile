# Build stage: websd estatico (TuConsultor vive aparte, ver tuconsultor/)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime estatico liviano
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY websd-server.mjs ./websd-server.mjs
EXPOSE 8080
CMD ["npm", "start"]
