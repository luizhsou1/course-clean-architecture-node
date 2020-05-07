FROM node:12
WORKDIR /usr/src/nf-extractor-classifier
COPY ./package.json .
RUN npm install --only=prod
