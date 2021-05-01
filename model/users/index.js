const jwt = require('jsonwebtoken')

const membersTable = `${process.env.DATABASE_PREFIX}members`,
  tokensTable = `${process.env.DATABASE_PREFIX}refreshtokens`,
  generateToken = user => {
    const { member_id } = user
    return jwt.sign({ member_id: member_id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30m',
    })
  },
  verifyToken = (req, res, next, token) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        if (err.name.toLowerCase().includes('expired')) {
          err.message = 'Token is expired, request a new token.'
        }
        return res.status(403).json({ message: err.message })
      }
      req.user = user
      next()
    })
  },
  generateRefreshToken = user => {
    const { member_id } = user
    return jwt.sign({ member_id: member_id }, process.env.REFRESH_TOKEN_SECRET)
  },
  verifyRefreshToken = (res, refreshToken) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(504).json({ message: err.message })
      res.status(201).json({
        accessToken: generateToken(user),
      })
      return user
    })
  }
module.exports = {
  membersTable,
  tokensTable,
  generateToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken,
}
