const user = require("../Models/userModels");
const userModel = require("../Models/userModels");
const emailService = require("../services/emailServices");

const getUsers = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    res.status(200).json({ status: "succeeded", user, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const patchById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("El usuario no existe");
    }

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    await user.save();
    res.status(200).json({ status: "succeeded", user, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new userModel({
      name,
      email,
    });

    await newUser.save();
    const subject = `Gracias por unirte ${name}`;
    const html = `<h1> Disfruta tu subscripcion ${name} gracias por el mensaje ${email}`;
    await emailService.sendEmail(email, subject, html);
    res.status(201).json({ status: "succeeded", newUser, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("El usuario no existe");
    }

    await userModel.findByIdAndDelete(userId);
    res.status(200).send({ status: "succeeded", error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const countUsers = async (req, res) => {
  try {
    const count = await userModel.find().countDocuments({});

    res.status(200).send({ status: "succeeded", count, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const getUsersByEmail = async (req, res) => {
  try {
    const users = await userModel.find({ email: { $regex: /@/ } });
    res.status(200).send({ status: "succeeded", users, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
  countUsers,
  getUsersByEmail,
};
