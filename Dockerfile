FROM node:lts-alpine
RUN apk add dumb-init g++ make
RUN apk add --no-cache python3 py3-pip
ENV NODE_ENV=production
WORKDIR /app
COPY . /app
RUN npm install --production
RUN cp .env.example .env
CMD ["dumb-init", "node", "src/app.js"]