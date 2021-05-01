const { getUsers, getUser } = require('./users')
const { authUser } = require('./auth')
const { generateNewToken } = require('./token')

module.exports = {
  usersGetRequest: (req, res) => {
    const { service } = req.params
    switch (service) {
      case 'get-users':
        getUsers(req, res)
        break
      case 'get-user':
        getUser(req, res)
        break
    }
  },
  usersPostRequest: (req, res) => {
    const { service } = req.params
    switch (service) {
      case 'auth':
        authUser(req, res)
        break
      case 'token':
        generateNewToken(req, res)
        break
    }
  },
}
