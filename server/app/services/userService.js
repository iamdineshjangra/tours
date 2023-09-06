const db = require("../models/index");

exports.getUserByEmail = async (email) => {
    const user = await db.User.findOne({ where: { email: email } })
    return user;
}

exports.getUserById = async (userId) => {
    return await db.User.findByPk(userId)
}