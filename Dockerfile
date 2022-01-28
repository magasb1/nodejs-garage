FROM node:16-alpine3.12

ENV NODE_ENV=production
ENV PYTHONUNBUFFERED=1
COPY . /app
WORKDIR /app

RUN apk add --no-cache --virtual \
          dumb-init \
          python3 \
          py3-pip \
          make \
          g++ \ 
   && ln -sf python3 /usr/bin/python \
   && npm install --production \
   && cp .env.example .env

CMD ["dumb-init", "node", "src/app.js"]