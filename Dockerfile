ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./ ./
RUN yarn build
COPY ./yarn.lock ./dist/

RUN yarn install --production --frozen-lockfile --cwd=dist

FROM node:${NODE_VERSION}-alpine AS runtime
EXPOSE 3000/tcp
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/local/bin/node", "/app/src/index.js"]
HEALTHCHECK --interval=15s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/status || exit 1

ENV NODE_ENV=production
RUN apk add --no-cache \
      tini
COPY --from=build /app/dist/ /app/
