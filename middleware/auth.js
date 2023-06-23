import { UnAnthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  //check if header starts with Authorization or Bearer
  //get the token and pass it to the next middleware

  //authorization: bearer <token>
  //const headers = req.headers;

  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith("Bearer")) {
  //   throw new UnAnthenticatedError("Authorization denied");
  // }

  //console.log(headers);
  //console.log(authHeader);

  // const token = authHeader.split(" ")[1];
  const token = req.cookies.token;
  if (!token) {
    throw new UnAnthenticatedError("authorization denied");
  }
  //console.log(token);

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "6494a81c19b3abe33593a33c";

    req.user = { userId: payload.userId, testUser };
    // console.log(payload);
    next();
  } catch (error) {
    throw new UnAnthenticatedError("authorization denied");
  }
};

export default auth;
