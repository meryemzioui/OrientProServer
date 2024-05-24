const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const avatar = req.image;

  const existingUser = await User.findOne({email});
  if (existingUser) {
    return res.status(400).send("Email already in use");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, email, password: hashedPassword,avatar });
    await user.save();
    res.json({user});
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("No user found with this email");
    }
    await bcrypt.compare(password, user.password);
    const token = jwt.sign({ userid: user._id }, "secret", { expiresIn: "1h" });
    res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.readUsers = async (req, res) => {
  try {
    const Users = await User.find();
    console.log(Users);
    res.json(Users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete a User
exports.deleteUsers = async (req, res) => {
  try {
    const deletedUsers = await User.findByIdAndDelete(req.params.id);
    if (!deletedUsers) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};