FROM node:8.9.4
WORKDIR /app
EXPOSE 3000

ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

COPY package.json yarn.lock /app/
RUN yarn install

COPY . .
RUN yarn bundle

ARG release_id
ENV RELEASE_ID=$release_id

CMD [ "node", "dist/server.js" ]