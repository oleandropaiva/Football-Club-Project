FROM node:16.14-alpine

WORKDIR /app-frontend

COPY . /app-frontend

RUN npm install

ENTRYPOINT ["npm", "start"]

# COPY . .
# EXPOSE 3000
# RUN npx tsc