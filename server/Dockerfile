FROM node:16 as builder

WORKDIR /tmp
COPY packages/shared-types/package.json .
COPY packages/shared-types/tsconfig.json .
RUN npm install
COPY packages/shared-types .
RUN npm run build

FROM builder
ENV SERVER_PORT=$SERVER_PORT

WORKDIR /app
COPY server/package.json .
COPY server/tsconfig.json .
RUN npm install
COPY server .
COPY --from=builder /tmp /node_modules/@tv-app-packages/shared-types
EXPOSE $SERVER_PORT
CMD [ "npm", "run", "dev" ]