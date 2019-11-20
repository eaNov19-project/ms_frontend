### STAGE 1: Build ###
FROM node:12.9.1-alpine as builder
# Preparing working environment.
RUN mkdir -p /usr/src/ms-frontend


# Installing dependencies.
COPY package*.json /usr/src/ms-frontend/
RUN npm install  
# --save-dev
# Copy ms-frontend source into image.
COPY . /usr/src/ms-frontend
WORKDIR /usr/src/ms-frontend

# Set environment variables
ENV ENVIRONMENT=production3

ENV API_GATEWAY="http://35.241.22.50"
# ENV MS_USER="http://user-ms-service.default.svc.cluster.local:8080"
# ENV MS_QUESTIONS="http://question-ms-service.default.svc.cluster.local:8080"
# ENV MS_ANSWERS="http://answer-ms-service.default.svc.cluster.local:8080"
# ENV MS_COMMENTS="http://comment-ms-service.default.svc.cluster.local:8080"
# Building app.
# RUN npm install
RUN npm run-script build-prod
# 13

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
