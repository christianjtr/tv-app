FROM node:26.13.1 AS builder

WORKDIR /workspace
COPY package.json package-lock.json ./
COPY app/package.json app/package.json
COPY server/package.json server/package.json
COPY packages/shared-types/package.json packages/shared-types/package.json
RUN test "$(npm --version)" = "11.11.1" && npm ci
COPY packages/shared-types packages/shared-types
RUN npm run build:shared-types

FROM builder AS server
ARG SERVER_PORT=3001
ENV SERVER_PORT=${SERVER_PORT}

COPY server server
WORKDIR /workspace/server
EXPOSE ${SERVER_PORT}
CMD [ "npm", "run", "dev" ]
