# Multi-step build: build client assets, then run Node server
FROM node:20-alpine AS builder
WORKDIR /app

# Copy client and server sources
COPY repairwale/client ./repairwale/client
COPY repairwale/server ./repairwale/server

# Install and build client
WORKDIR /app/repairwale/client
RUN npm ci && npm run build

# Runtime image
FROM node:20-alpine
WORKDIR /app

# Copy server and built client assets
COPY --from=builder /app/repairwale/server ./repairwale/server
COPY --from=builder /app/repairwale/client/dist ./repairwale/client/dist

# Install server deps
WORKDIR /app/repairwale/server
RUN npm ci

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "index.js"]
