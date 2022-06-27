FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g migrate-mongo && git clone https://github.com/vishnubob/wait-for-it.git

COPY . /app/

CMD ["npm", "run", "start:prod"]