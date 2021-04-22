const {
  tokensTable,
  generateToken,
  verifyRefreshToken,
} = require('../../model/users')

module.exports = {
  generateNewToken: (req, res, db) => {
    const { refreshToken } = req.body,
      select = `SELECT ${[`token`].join(', ')}`,
      from = `FROM ${tokensTable}`,
      where = `where token = '${refreshToken}'`,
      sql = `${select} ${from} ${where}`
    if (refreshToken === undefined)
      return res.status(403).json({ message: err.message })
    db.query(sql, function (err, result) {
      if (err) return res.status(504).json({ message: err.message })
      const isTokenStored = result.some(row => row.token === refreshToken)
      if (!isTokenStored)
        return res.status(203).json({ message: 'Invalid refresh token' })
      try {
        verifyRefreshToken(res, refreshToken)
      } catch (error) {
        return res.status(504).json({ message: error.message })
      }
    })
  },
}
