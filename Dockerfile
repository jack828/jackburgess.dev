FROM node:8.15.1-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]
