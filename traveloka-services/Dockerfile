from node:14

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .

EXPOSE 3301



RUN npm install

CMD ["npm","start"]
