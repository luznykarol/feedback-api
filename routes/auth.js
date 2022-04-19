const router = require("express").Router();
const User = require("../modules/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Joi = require("joi");

const registerValidation = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
  //validation before adding a user
  const { error } = registerValidation.validate(req.body);
  if (error) return res.status(400).send(error);

  //check if user is in db
  const emailExists = await User.findOne({ email: req.body.email });
  const nameExists = await User.findOne({ name: req.body.name });
  if (emailExists) return res.status(400).send("Email already exists");
  if (nameExists)
    return res
      .status(400)
      .send("Duplicated username. Please create a different username.");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

const loginValidation = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) return res.status(400).send(error);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
