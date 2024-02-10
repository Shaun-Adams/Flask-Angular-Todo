# Stage 1: Build the Angular app in a node.js environment
FROM node:14 as build
WORKDIR /app
COPY ./angular-todo/package.json ./angular-todo/package-lock.json ./
RUN npm install
COPY ./angular-todo/ ./
RUN npm run build

#Stage 2: Serve the Angular app using NGINX
FROM nginx:alpine
COPY --from=build /app/dist/angular-todo /usr/share/nginx/html
COPY ../default.conf /etc/nginx/conf.d/default.conf

