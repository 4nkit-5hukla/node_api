module.exports = {
  getUsers: (req, res, db) => {
    const { member_id, exp } = req.user,
      tableName = ` FROM ${process.env.DATABASE_PREFIX}members`,
      select = `SELECT ${Array(
        `member_id`,
        `role_id`,
        `coaching_id`,
        `login`,
        `password`,
        `email`,
        `status`
      ).join(', ')}`,
      sql = `${select}${tableName}`
    db.query(sql, (err, result) => {
      if (err) console.log(err)
      res.status(200).json({
        data: result,
        member_id: member_id,
        exp: exp,
      })
    })
  },
}
