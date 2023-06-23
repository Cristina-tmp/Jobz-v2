import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAnthenticatedError } from "../errors/index.js";
import attachCookie from "../utils/attachCookies.js";

const register = async (req, res, next) => {
  // res.send("register user");
  // try {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  //check for duplicate emails before creating the user
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError(`Email already exists`);
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
  });
  //  } catch (error) {
  //res.status(500).json({ msg: "there was an error" });

  //pass the error to the error handler middleware
  // next(error);
  //  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAnthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new UnAnthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  user.password = undefined;
  attachCookie({ res, token });
  res.status(StatusCodes.OK).json({ user, location: user.location });

  //res.send("login user");
};

const updateUser = async (req, res) => {
  const { name, email, lastName, location } = req.body;
  if (!email || !email || !lastName || !location) {
    throw new BadRequestError("please provide email and password");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.name = name;
  user.email = email;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({ user, location: user.location });
  //res.send("update user");
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "logged out" });
};

export { register, login, updateUser , getCurrentUser, logout};
