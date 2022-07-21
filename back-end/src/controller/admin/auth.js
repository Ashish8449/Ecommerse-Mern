const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      // throw an error if the user
      // error user already exist
      res.status(400).json({
        message: "admin already exists",
      });
    }

    const new_user = new User({
      firstName,
      lastName,
      password,
      email,
      userName: Math.random().toString(),
      role: "admin",
    });

    await new_user.save();

    return res
      .status(201)
      .json({ message: "Admin created successfully", data: new_user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // check user exist or not
    if (!user) {
      // throw an error if the user not exist
      throw new Error("Admin not exist ");
    }

    // check password match or not

    if (!user.authenticate(password)) {
      // incorrect password
      throw new Error("Please enter a valid email and password");
    }
    if (user.role === "user") {
      throw new Error("You are not admin .Please login as a user");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res
      .status(200)
      .json({ token, message: "user login successfully", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.requireSignin = (req, res, next) => {
  let token = req.headers.authorization;

  token = token.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = user;

  //   jwt.decode();
  next();
};
