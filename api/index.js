const { usersGetRequest, usersPostRequest } = require('./users')
const { verifyToken } = require('../model/users')

module.exports = {
  authenticateRequest: (req, res, next) => {
    const { module, service } = req.params
    const allowedServices = ['auth', 'token']
    if (
      req.method === 'POST' &&
      module === 'users' &&
      allowedServices.includes(service)
    ) {
      next()
    } else {
      const authHeader = req.headers['authorization'],
        token = authHeader && authHeader.split(' ').pop()
      if (token === undefined) {
        return res.sendStatus(401)
      } else {
        verifyToken(req, res, next, token)
      }
    }
  },
  apiGetRequest: (req, res) => {
    const { module } = req.params
    switch (module) {
      case 'users':
        usersGetRequest(req, res)
        break
    }
  },
  apiPostRequest: (req, res) => {
    const { module } = req.params
    switch (module) {
      case 'users':
        usersPostRequest(req, res)
        break
    }
  },
}
