const { tokenGenerator } = require("../globals/global");
const AdminModel = require("../models/admin");
const AdminUser = require("../controllers/user");

exports.create = async (req, res) => {
  try {
    const createAdmin = await AdminModel.create(req.body);
    return res.status(200).json({
      message: "Admin is created",
      status: 1,
      data: createAdmin,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await AdminModel.findOne({ username });
    if (user.password !== password) {
      return res.status(400).send("Invalid Password!");
    }
    const payload = {
      userId: user._id,
      username: username,
      role: "admin",
    };
    let token = tokenGenerator(payload);
    return res
      .status(200)
      .json({ message: "User authenticated successfully", token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.get = async (req, res) => {
  try {
    console.log(req.user);
    const getAdmin = await AdminModel.find({ id: req.body._id });
    return res.status(200).json({
      message: "User found successfully",
      status: 1,
      data: getAdmin,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.update = async (req, res) => {
  try {
    const { username, password } = req.body;
    const updatedFields = {};
    if (username) updatedFields.username = username;
    if (password) updatedFields.password = password;
    const adminUpdate = await AdminModel.findOneAndUpdate(
      { username: req.params.username },
      updatedFields,
      { new: true }
    );
    return res.status(200).json({
      message: "Update is successfully",
      status: 1,
      data: adminUpdate,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const delAdmin = await AdminModel.findOneAndDelete({
      username: req.params.username,
    });
    return res.status(200).json({
      message: "User deleted successfully",
      status: 1,
      data: delAdmin,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
