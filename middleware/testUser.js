import { BadRequestError } from "../errors/index.js";

const testUser = async (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Test user, read only");
  }
  next();
};

export default testUser;
