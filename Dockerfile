FROM node:16-alpine3.12

WORKDIR /app
ENV NODE_ENV=production
ENV PYTHONUNBUFFERED=1

RUN apk add --update --no-cache dumb-init python3 py3-pip make g++ \ 
   && ln -sf python3 /usr/bin/python

COPY . /app

RUN npm install --production
RUN cp .env.example .env

CMD ["dumb-init", "node", "src/app.js"]