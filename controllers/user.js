const user = require("../models/user");
const UserModel = require("../models/user");

exports.create = async (req, res, next) => {
  try {
    const createUser = await UserModel.create(req.body);
    return res.status(201).json({
      message: "User added successfully",
      success: 1,
      createUser,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ name: "dfs" }, { _id: 0, __v: 0 });
    return res.status(200).json({
      message: "User Data fetched..",
      status: 1,
      data: users,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    console.log(req.params.email);
    // const user = await UserModel.findOne({email:req.query.email})
    const user = await UserModel.findOne({ _id: req.params.id });
    if (!user)
      return res.status(400).json({
        message: "No Users Found",
        status: 0,
      });
    return res.status(200).json({
      message: "User Data fetched..",
      status: 1,
      data: user,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, contact, address } = req.body;
    let user = await UserModel.findOne({_id:req.params.id})
    if(!user){
      return res.status(404).json({
        message:"Not found"
      })
    }
    user.name = name ?name:user.name;
    user.email = email ? email:user.email;
    await user.save();

    return res.status(200).json({
      message: "Data updated",
      success: 1,
      data: user,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const delUser = await UserModel.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({
      message: "Data deleted",
      status: 1,
      data: delUser,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
