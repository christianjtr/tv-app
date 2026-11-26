FROM node:26.13.1 AS builder

WORKDIR /workspace
COPY package.json package-lock.json ./
COPY app/package.json app/package.json
COPY server/package.json server/package.json
COPY packages/shared-types/package.json packages/shared-types/package.json
RUN test "$(npm --version)" = "11.11.1" && npm ci
COPY packages/shared-types packages/shared-types
RUN npm run build:shared-types

FROM builder AS app
ARG VITE_APP_SERVER_PORT=3000
ENV VITE_APP_SERVER_PORT=${VITE_APP_SERVER_PORT}

COPY app app
WORKDIR /workspace/app
EXPOSE $VITE_APP_SERVER_PORT
CMD [ "npm", "run", "dev" ]
