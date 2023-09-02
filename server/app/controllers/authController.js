const db = require("../models/index");

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, role, email, password } = req.body;
    if(!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            status: 'fail',
            errMessage: 'Please enter all required field'
        });
    }
    if(role) {
        return res.status(400).json({
            status: 'fail',
            errMessage: 'This api is not to add role. Please do a hit to other api to achieve this.'
        })
    }
    const user = await db.User.create(req.body);
    return res.status(201).json({
        status: 'success',
        user: user
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
        status: 'fail',
        errMessage: 'Error while creating user'
    })
  }
};
