FROM node:21-alpine AS builder

ARG APP_URL
ARG NEXT_PUBLIC_URLS
ARG NEXT_PUBLIC_CHECKOUT
ARG NEXT_PUBLIC_USER

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm prisma generate

RUN SKIP_ENV_VALIDATION=1 pnpm run build

FROM node:21-alpine AS runner

RUN apk add --no-cache curl ca-certificates && update-ca-certificates

RUN npm install -g pnpm

WORKDIR /app

ENV NODE_ENV production
ENV APP_URL=${APP_URL}
ENV NEXT_PUBLIC_URLS=${NEXT_PUBLIC_URLS}
ENV NEXT_PUBLIC_CHECKOUT=${NEXT_PUBLIC_CHECKOUT}
ENV NEXT_PUBLIC_USER=${NEXT_PUBLIC_USER}


COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

RUN pnpm install --prod

COPY --from=builder /app/public ./public 
COPY --from=builder /app/prisma ./prisma 
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN pnpm prisma generate

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]