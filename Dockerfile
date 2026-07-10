# ============================================================
# AjoVault frontend (Next.js) — multi-stage, standalone output.
# NEXT_PUBLIC_* is baked at build time, so the API base URL is
# passed as a build-arg (per environment) by the CI build workflow.
# ============================================================
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV HUSKY=0
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
ENV HUSKY=0 NEXT_TELEMETRY_DISABLED=1
# API base URL used server-side by the Next.js rewrite proxy.
# NOT a NEXT_PUBLIC_ var — it must never be baked into the client bundle.
ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
