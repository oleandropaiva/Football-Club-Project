FROM node:16.14-alpine
WORKDIR /app-frontend
RUN npm install
COPY . .
CMD [ "npm", "start" ]
COPY package.json .