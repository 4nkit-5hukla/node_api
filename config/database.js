const QueryBuilder = require('node-querybuilder')

module.exports = new QueryBuilder(
  {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
  },
  'mysql',
  'pool'
)
