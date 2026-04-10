FROM node:18-alpine

WORKDIR /usr/src/app

COPY app/package*.json ./
RUN npm ci --omit=dev

COPY app/ ./

ENV LAB_MODE=false

EXPOSE 3000

CMD ["node", "server.js"]
