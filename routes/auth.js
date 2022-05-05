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

const maxTokenAge = 3 * 24 * 60 * 60; // 3 days, time in seconds

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.TOKEN_SECRET, {
    expiresIn: maxTokenAge,
  });
};

router.post("/register", async (req, res) => {
  //validation before adding a user
  const { error } = registerValidation.validate(req.body);
  if (error) return res.status(400).send(error);

  //check if user is in db
  const emailExists = await User.findOne({ email: req.body.email });
  const nameExists = await User.findOne({ name: req.body.name });
  if (emailExists)
    return res
      .status(400)
      .send({ error: "Email already exists", type: "email" });
  if (nameExists)
    return res.status(400).send({
      error: "Duplicated username. Please create a different username.",
      type: "email",
    });

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
    // const createToken = (id) => {
    //   return jwt.sign({ _id: id }, process.env.TOKEN_SECRET, {
    //     expiresIn: maxTokenAge,
    //   });
    // };

    const savedUser = await user.save();

    const userToken = createToken(savedUser._id);

    // res.send({
    //   id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   joinedDate: user.date,
    // });

    res.cookie("token", userToken, { httpOnly: true });
    res.json({ userToken });
  } catch (err) {
    res.status(400).send(err);
  }
});

///////////// login

const loginValidation = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error)
    return res.status(400).send({
      error: error.details[0].message,
      type: error.details[0].context.key,
    });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ error: "Email not found", type: "email" });
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(400)
      .send({ error: "Invalid password", type: "password" });

  // res.send(user);
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  console.log("token", token);
  res.header("auth-token", token).send({ token: token });
});

module.exports = router;
