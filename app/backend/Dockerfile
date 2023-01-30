FROM node:16.14-alpine

WORKDIR /app-backend

COPY . /app-backend

RUN npm install && npm run build

CMD ["npm", "start"]

# EXPOSE 3001
# RUN npx tsc