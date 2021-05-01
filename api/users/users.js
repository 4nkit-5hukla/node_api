const pool = require('../../config/database')

module.exports = {
  getUsers: async (req, res) => {
    const qb = await pool.get_connection()
    try {
      const { member_id, exp } = req.user,
        tableName = `${process.env.DATABASE_PREFIX}members`
      await qb
        .select([
          // ! use * for all fields
          `member_id`,
          `role_id`,
          `coaching_id`,
          `login`,
          `password`,
          `email`,
          `status`,
        ])
        .get(tableName, (err, result) => {
          if (err) throw err
          res.status(200).json({
            data: result,
            member_id: member_id,
            exp: exp,
          })
        })
      // console.log('Query Ran: ' + qb.last_query())

      // console.log('Results:', result)
    } catch (err) {
      if (err) {
        return res.status(504).json({ message: err.msg })
      }
      return console.error("Uh oh! Couldn't get results: " + err.msg)
    } finally {
      qb.release()
    }
  },
  getUser: async (req, res) => {
    const qb = await pool.get_connection()
    try {
      const { member_id, exp } = req.user,
        tableName = `${process.env.DATABASE_PREFIX}members`
      await qb
        .select([
          // ! use * for all fields
          `member_id`,
          `role_id`,
          `coaching_id`,
          `login`,
          `password`,
          `email`,
          `status`,
        ])
        .where({ member_id: req.params.param_1 })
        .get(tableName, (err, result) => {
          if (err) console.log(err)
          if (result.length === 1)
            res.status(200).json({
              data: result.pop(),
              member_id: member_id,
              exp: exp,
            })
          else
            res.status(200).json({
              data: result,
              message: `User doesn't exist`,
              member_id: member_id,
              exp: exp,
            })
        })
      // console.log('Query Ran: ' + qb.last_query())

      // console.log('Results:', result)
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
