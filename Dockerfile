### STAGE 1: Build ###
FROM node:12.9.1-alpine as builder
# Preparing working environment.
RUN mkdir -p /usr/src/ms-frontend


# Installing dependencies.
COPY package*.json /usr/src/ms-frontend/
RUN npm install
# Copy ms-frontend source into image.
COPY . /usr/src/ms-frontend
WORKDIR /usr/src/ms-frontend
# Building app.
RUN npm run-script build


### STAGE 2: Setup ###
FROM nginx:1.13.12-alpine
# Removing nginx default page.
# RUN rm -rf /usr/share/nginx/html/*
# Copying nginx configuration.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copying ms-frontend source into web server root.
COPY --from=builder /usr/src/ms-frontend/dist/q-and-a/ /usr/share/nginx/html
# Exposing ports.
EXPOSE 80
# Starting server.
CMD ["nginx", "-g", "daemon off;"]