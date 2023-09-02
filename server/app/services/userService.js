const db = require("../models/index");

exports.getUser = async (email) => {
    const user = await db.User.findOne({ where: { email: email } })
    return user;
}