FROM node:21-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN SKIP_ENV_VALIDATION=1 pnpm run build

FROM node:21-alpine AS runner

RUN npm install -g pnpm

WORKDIR /app

ENV NODE_ENV production


COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
#COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public 
COPY --from=builder /app/prisma ./prisma 
COPY --from=builder /app/next.config.mjs ./next.config.mjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]