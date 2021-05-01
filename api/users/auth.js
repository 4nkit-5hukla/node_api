const bcrypt = require('bcrypt')
const {
  membersTable,
  tokensTable,
  generateToken,
  generateRefreshToken,
} = require('../../model/users')
const pool = require('../../config/database')

const validatePassword = async (req, res, user) => {
  const qb = await pool.get_connection()
  try {
    const { password } = req.body,
      validPassword = await bcrypt.compare(password, user.password)
    if (validPassword) {
      const accessToken = generateToken(user),
        refreshToken = generateRefreshToken(user),
        result = await qb
          .returning('token')
          .insert(tokensTable, { token: refreshToken })
      // console.log('Query Ran: ' + qb.last_query())

      // console.log('Results:', result)
      if (result.affectedRows) {
        return res.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          message: 'Logged in successfully',
        })
      }
    } else {
      return res.status(500).json({ message: 'Invalid username or password' })
    }
  } catch (err) {
    if (err) {
      return res.status(504).json({ message: err.msg })
    }
    return console.error("Uh oh! Couldn't get results: " + err.msg)
  } finally {
    qb.release()
  }
  // const passwordArray = hashedPassword.split("."),
  // 	storedPassword = passwordArray.pop(),
  // 	storedSalt = passwordArray.pop()
  // genPassword = await bcrypt.hash(password, storedSalt)
  // console.log(storedSalt, storedPassword)
  // const salt = await bcrypt.genSalt(),
}
module.exports = {
  authUser: async (req, res) => {
    const qb = await pool.get_connection()
    try {
      const { username } = req.body,
        result = await qb
          .select([
            'member_id',
            'role_id',
            'coaching_id',
            'login',
            'password',
            'email',
            'status',
          ])
          .where({ login: username })
          .get(membersTable)

      // console.log('Query Output: ' + qb.last_query())

      // console.log('Results:', result)

      const user = result.find(user => user.login === username)
      if (user === undefined) {
        return res.status(500).json({ message: 'Invalid username or password' })
      } else {
        validatePassword(req, res, user)
      }
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
