const bcrypt = require("bcrypt")
const {
	membersTable,
	tokensTable,
	generateToken,
	generateRefreshToken,
} = require("../../model/users")

const validatePassword = async (req, res, db, user) => {
	const { password } = req.body,
		validPassword = await bcrypt.compare(password, user.password)
	if (validPassword) {
		const accessToken = generateToken(user),
			refreshToken = generateRefreshToken(user),
			insertInto = `INSERT INTO ${tokensTable}`
		fields = `(${Array("`token`").join(", ")})`
		values = `VALUES (${Array(`'${refreshToken}'`).join(", ")})`
		sql = `${insertInto} ${fields} ${values}`
		db.query(sql, function (error, result) {
			if (error) {
				return res.status(504).json({ message: error.message })
			}
			if (result.affectedRows) {
				return res.status(200).json({
					accessToken: accessToken,
					refreshToken: refreshToken,
					message: "Logged in successfully",
				})
			}
		})
	} else {
		return res.status(500).json({ message: "Invalid username or password" })
	}
	// const passwordArray = hashedPassword.split("."),
	// 	storedPassword = passwordArray.pop(),
	// 	storedSalt = passwordArray.pop()
	// genPassword = await bcrypt.hash(password, storedSalt)
	// console.log(storedSalt, storedPassword)
	// const salt = await bcrypt.genSalt(),
}
module.exports = {
	authUser: (req, res, db) => {
		db = db
		const { username } = req.body,
			select = `SELECT ${[
				`member_id`,
				`role_id`,
				`coaching_id`,
				`login`,
				`password`,
				`email`,
				`status`,
			].join(", ")}`,
			from = ` FROM ${membersTable}`,
			where = ` where login = '${username}'`,
			sql = `${select}${from}${where}`
		db.query(sql, (err, result) => {
			if (err) {
				return res.status(504).json({ message: err.message })
			} else {
				const user = result.find((user) => user.login === username)
				if (user === undefined) {
					return res
						.status(500)
						.json({ message: "Invalid username or password" })
				}
				try {
					validatePassword(req, res, db, user)
				} catch (error) {
					return res.status(504).json({ message: error.message })
				}
			}
		})
	},
}
