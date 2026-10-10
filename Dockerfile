# Build stage: websd estático + TuConsultor (Next.js con API server-side)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime único para servir websd y TuConsultor bajo el mismo dominio
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tuconsultor ./tuconsultor
COPY websd-server.mjs ./websd-server.mjs
EXPOSE 8080
CMD ["npm", "start"]
