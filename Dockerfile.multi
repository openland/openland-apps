FROM node:8.9.4 AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn bundle

FROM node:8.9.4 AS runner
EXPOSE 3000
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
WORKDIR /app
COPY --from=builder /app /app
CMD [ "yarn", "start" ]