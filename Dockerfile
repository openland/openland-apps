FROM node:8.9.4-alpine

# Create app directory
WORKDIR /build

COPY package.json ./
COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]