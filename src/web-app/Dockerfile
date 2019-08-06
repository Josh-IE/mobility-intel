FROM mhart/alpine-node:11 AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/

RUN npm install

COPY . .

EXPOSE 3000