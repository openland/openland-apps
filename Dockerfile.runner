FROM node:8.9.4-alpine

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /app
ADD package.prod.json /app/package.json
RUN yarn install
COPY dist/ /app/

EXPOSE 3000
ENV NODE_ENV=production
ARG release_id
ENV RELEASE_ID=$release_id
CMD [ "node", "server.js" ]