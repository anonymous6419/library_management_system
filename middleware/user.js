const UserModel = require("../models/user");
exports.checkBody = async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).send("Request body is required");
    if (
      !req.body.name ||
      req.body.name === "" ||
      (req.body.name === undefined && !req.body.email) ||
      req.body.email === "" ||
      req.body.email === undefined
    )
      return res.status(400).send("Name And Email is required");
    if (!req.body.email.includes("@"))
      return res.status(400).send("Enter a valid email");

      
    req.body.name = req.body.name.toString().toLowerCase();
    req.body.email = req.body.email.toString().toLowerCase();
    req.body.gender = req.body.gender.toString().toLowerCase();
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.checkValidUser = async (req, res, next) => {
  try {
    const user = await UserModel.find({
      email: req.body.email.toString().toLowerCase(),
      isDeleted: false,
    });
    if (user.length>0) return res.status(400).send("Email already in use");
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
