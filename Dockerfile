FROM node:lts-alpine
RUN apk add dumb-init
ENV NODE_ENV=production
USER node
WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node . /app
RUN npm install --production

CMD ["dumb-init", "node", "src/app.js"]