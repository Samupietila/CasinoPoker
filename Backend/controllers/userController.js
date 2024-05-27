const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create a new token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Create a new user
const createUser = async (req, res) => {
  const { name, username, password, funds } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const userChecked = await User.findOne({
      username: req.body.username,
      _id: { $ne: req.params.id },
    });
    if (userChecked) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const roles = "user";
    const user = await User.create({
      name,
      username,
      password,
      hashedPassword,
      funds,
    });
    const token = createToken(user._id);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error (getUsers)" });
  }
};

// GET a single user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error (getUser)" });
  }
};

// GET a single user by username
const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
      _id: { $ne: req.params.id },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error (getUserByUsername)" });
  }
};

// DELETE a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error (deleteUser)" });
  }
};

// Update (Patch) a single user by ID
const patchUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Update user failed, check console." });
    console.log(err.message);
  }
};

// Replace (Put) a single user by ID
const putUser = async (req, res) => {
  try {
    const user = await User.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error putUser" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const validPassword = await bcrypt.compare(password, user.hashedPassword);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const token = createToken(user._id);
  res.status(200).json({ user, token });
};

const addRoles = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { username: username },
      { ...req.body },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error addRoles" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserByUsername,
  deleteUser,
  patchUser,
  putUser,
  loginUser,
  addRoles,
};
