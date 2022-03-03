FROM node:latest as base

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
EXPOSE 3000
WORKDIR /app
COPY package.json pnpm-lock.yaml ./


FROM base as dev

RUN pnpm install --frozen-lockfile
COPY prisma ./prisma/
RUN pnpx prisma generate
CMD [ "pnpm", "run", "start:dev" ]
