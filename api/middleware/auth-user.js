const auth = require("basic-auth");
const bcrypt = require("bcryptjs");
const { Users } = require("../models");

//authenticate user by email
exports.authenticateUser = async (req, res, next) => {
  let message;
  const credentials = auth(req);

  // This will authenticate the User by email address.
  if (credentials) {
    let user = await User.findOne({
      where: { emailAddress: credentials.name },
    });
    //if email is correct authenicate user by password
    if (user) {
      const authenticated = await bcrypt.compare(
        credentials.pass,
        user.password
      );
      //if true console.log
      if (authenticated) {
        req.currentUser = user;
        //if false console.log
      } else {
        message = `Authentication failure for username: ${user.email}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = "Auth header not found";
  }
  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};
