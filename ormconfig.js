module.exports = {
  "name": "default",
  "type": "mongodb",
  "url": process.env.TYPEORM_HOST,
  "useNewUrlParser": true,
  "synchronize": true,
  "logging": true,
  "useUnifiedTopology": true,
  "entities": [
    "./src/modules/**/infra/typeorm/schemas/*.ts"
  ]
}
