FROM node:10.15.0-jessie

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY internals /usr/src/app/internals
COPY yarn.lock /usr/src/app/

RUN yarn install

# Bundle app source
COPY . /usr/src/app/
