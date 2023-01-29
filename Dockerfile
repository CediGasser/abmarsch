# syntax=docker/dockerfile:1

FROM node:16.15.1-alpine3.15 AS builder
WORKDIR /app
COPY package.json package-lock.json svelte.config.js ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --production

FROM node:16.15.1-alpine3.15
USER node:node
WORKDIR /app
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json .
ENV PORT 443
EXPOSE ${PORT}
CMD ["node","build"]