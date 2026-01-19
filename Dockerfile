# syntax=docker/dockerfile:1

FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json svelte.config.js ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-alpine
ENV NODE_ENV=production
USER node:node
WORKDIR /app
COPY --from=builder --chown=node:node /app/build ./build
COPY --chown=node:node package.json .
CMD ["node","build/index.js"]
