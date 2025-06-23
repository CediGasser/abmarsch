# syntax=docker/dockerfile:1

FROM node:22.2-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json svelte.config.js ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev --ignore-scripts

FROM node:22.2-alpine
USER node:node
WORKDIR /app
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json .
ENV PORT=443
EXPOSE ${PORT}
CMD ["node","build/index.js"]