# syntax=docker/dockerfile:1

# ---- Build ----
FROM oven/bun:1.3 AS build
WORKDIR /app

# Outils natifs pour better-sqlite3 (au cas où aucun binaire précompilé ne correspond)
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY . .
# Les scripts d'install sont nécessaires (binaire natif better-sqlite3, nuxt prepare)
RUN bun install --frozen-lockfile

ARG NUXT_PUBLIC_SITE_URL=https://alexisdechiara.fr
ENV NUXT_PUBLIC_SITE_URL=${NUXT_PUBLIC_SITE_URL} \
    NITRO_PRESET=node-server \
    NODE_OPTIONS=--max-old-space-size=4096

RUN bun run build

# ---- Runtime ----
FROM node:22-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
