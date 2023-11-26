FROM node:21-alpine3.18
WORKDIR /app
COPY . .
RUN npm i
CMD npm run build && npm run start:prod
EXPOSE 3000
