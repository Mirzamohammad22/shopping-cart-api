FROM node:14.16.0

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

RUN mkdir /usr/src/app && chown node:node /usr/src/app
WORKDIR /usr/src/app

USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npm update && npm install && npm cache clean --force
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY --chown=node:node . .

CMD [ "node", "./src/server.js" ]
