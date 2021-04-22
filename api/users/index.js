const { getUsers } = require('./users')
const { authUser } = require('./auth')
const { generateNewToken } = require('./token')
const toUFC = string => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}

module.exports = {
  usersGetRequest: (req, res, db) => {
    const { service } = req.params
    switch (service) {
      case 'get-users':
        getUsers(req, res, db)
        break
    }
  },
  usersPostRequest: (req, res, db) => {
    const { service } = req.params
    switch (service) {
      case 'auth':
        authUser(req, res, db)
        break
      case 'token':
        generateNewToken(req, res, db)
        break
    }
  },
}
