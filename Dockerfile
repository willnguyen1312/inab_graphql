FROM node

WORKDIR /inab

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/

RUN npm i -g yarn
RUN yarn install

COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/common/dist ./packages/common/dist
COPY ./packages/server/.env.production ./packages/server/.env
COPY ./packages/server/.env.example ./packages/server/
COPY ./ormconfig.json .

WORKDIR ./packages/server

ENV NODE_ENV production

EXPOSE 4000

CMD ["node", "dist/index.js"]