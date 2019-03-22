module.exports = {
    client: {
      name: "Openland API",
      service: {
        name: "Openland",
        localSchemaFile: "schema.json"
      },
      includes: ['./packages/openland-api/*/*.ts']
    }
  };
  