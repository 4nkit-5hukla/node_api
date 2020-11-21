const { createConnection } = require("mysql")

module.exports = createConnection({
	host: process.env.HOST,
	user: process.env.USER_NAME,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
})
