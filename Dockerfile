FROM node:16-alpine

COPY . /var/www
WORKDIR /var/www

EXPOSE 3000

ENTRYPOINT npm start