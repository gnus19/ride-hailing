FROM node:20-alpine

RUN mkdir /api

WORKDIR /api

ADD package*.json /api/

RUN npm i

USER node

ADD . /api/
