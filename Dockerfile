FROM node:alpine

WORKDIR "/app"

# Move package.json to container
COPY ./package.json ./

RUN npm install yarn

RUN yarn install

COPY . .

CMD ["yarn", "dev"]