const userService = require("../services/userService");
const responseUtils = require("../utils/sendResponse");

exports.me = async(req, res) => {
    try{
      const user = req.user;
      if(!user) {
          return responseUtils.sendErrorResponse(401, 'You are not loggedin.', res)
      }
      return res.status(200).json({
        status: 'success',
        user: user
      })
    } catch(err) {
        console.log(err);
        return responseUtils.sendErrorResponse(500, 'Error while getting user info', res)
    }
}