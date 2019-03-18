module.exports = {
    client: {
      name: "Openland API",
      service: {
        name: "Openland",
        url: "http://localhost:9000/api"
      },
      includes: ['./packages/openland-api/*/*.ts']
    }
  };
  