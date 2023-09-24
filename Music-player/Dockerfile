FROM node:14-alpine as build

WORKDIR /dist/src/app

RUN npm cache clean --force

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:stable

COPY --from=build /dist/src/app/dist/UIpractise /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf


EXPOSE 80