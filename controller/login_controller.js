const userService = require("../service/user_service");

async function validateLogin(req, res) {
  let user = req.body;

  try {
    let message = await userService.verifyLogin(user);
    res.status(201).json(message);
  } catch (err) {
    // res.status(err.id).json(err);
    res.status(400).json(err);
  }
}

module.exports = {
  validateLogin,
};
