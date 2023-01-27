FROM node:16.14-alpine
WORKDIR /app-backend
RUN npm install
COPY . .
CMD [ "npm", "start" ]
COPY package.json .