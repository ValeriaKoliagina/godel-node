FROM node:21-alpine3.18
WORKDIR /app
COPY . .
RUN npm i
RUN npm run migrations:run
CMD ["npm", "run", "start"]
EXPOSE 3000
