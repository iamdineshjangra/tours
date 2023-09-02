const db = require("../models/index");
const authService = require('../services/authService');
const userService = require('../services/userService')
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
    const user = await authService.signup(req.body);
    const token = authService.createJwtToken(user.id);
    return res.status(201).json({
        status: 'success',
        user: user,
        token: token
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
        status: 'fail',
        errMessage: 'Error while creating user'
    })
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        errMessage: "Please enter required fields",
      });
    }
    const user = await userService.getUser(email);
    const isCorrectPassword = await user.validatePassword(password);
    if (isCorrectPassword) {
      const token = authService.createJwtToken(user.id);
      return res.status(200).json({
        status: "success",
        user: user,
        token: token,
      });
    }
    res.status(401).send({
      status: "fail",
      errMessage: "Incorrect password",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "fail",
      errMessage: "Error while login the user",
    });
  }
};
