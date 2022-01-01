FROM node:14.18-alpine AS BUILD_IMAGE

WORKDIR /app
ENV NODE_ENV=production

RUN apk add --update dumb-init python make g++ \
   && rm -rf /var/cache/apk/*

COPY . /app

RUN npm install --production
RUN cp .env.example .env

CMD ["dumb-init", "node", "src/app.js"]