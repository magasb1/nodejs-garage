FROM node:lts-alpine
RUN apk add dumb-init g++ make python
ENV NODE_ENV=production
WORKDIR /app
COPY --chown=node:node . /app
RUN npm install --production

USER node
CMD ["dumb-init", "node", "src/app.js"]