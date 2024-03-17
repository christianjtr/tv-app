FROM node:16 as builder

WORKDIR /tmp
COPY packages/shared-types/package.json .
COPY packages/shared-types/tsconfig.json .
RUN npm install
COPY packages/shared-types .
RUN npm run build

FROM builder
ENV VITE_APP_SERVER_PORT=$VITE_APP_SERVER_PORT

WORKDIR /app
COPY app/package.json .
COPY app/tsconfig.json .
RUN npm install
COPY app .
COPY --from=builder /tmp /node_modules/@tv-app-packages/shared-types
EXPOSE $VITE_APP_SERVER_PORT
CMD [ "npm", "run", "dev" ]