const { tokensTable, verifyRefreshToken } = require('../../model/users')
const pool = require('../../config/database')

module.exports = {
  generateNewToken: async (req, res) => {
    const qb = await pool.get_connection()
    try {
      const { refreshToken } = req.body,
        result = await qb
          .select('token')
          .where({ token: refreshToken })
          .get(tokensTable)

      // console.log('Query Ran: ' + qb.last_query())

      // console.log('Results:', result)

      const isTokenStored = result.some(row => row.token === refreshToken)
      if (!isTokenStored) {
        return res.status(203).json({ message: 'Invalid refresh token' })
      }
      verifyRefreshToken(res, refreshToken)
    } catch (err) {
      if (err) {
        return res.status(504).json({ message: err.msg })
      }
      return console.error("Uh oh! Couldn't get results: " + err.msg)
    } finally {
      qb.release()
    }
  },
}
