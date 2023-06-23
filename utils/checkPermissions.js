import { UnAnthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnAnthenticatedError("Not Authorized");
};

export default checkPermissions;
