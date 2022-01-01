FROM node:16-alpine3.12

WORKDIR /app
ENV NODE_ENV=production

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache dumb-init python3 make g++ \ 
   && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

COPY . /app

RUN npm install --production
RUN cp .env.example .env

CMD ["dumb-init", "node", "src/app.js"]