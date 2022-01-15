const auth = require("basic-auth");
const bcrypt = require("bcryptjs");
const { Users } = require("../models");

//authenticate user by email
exports.authenticateUser = (req, res, next) => {
  console.log(req);
  let message;
  const credentials = auth(req);
  if (credentials) {
    Users.findOne({
      where: { emailAddress: credentials.name },
    })
      //if email is correct authenicate user by password
      .then((user) => {
        const authenticated = bcrypt.compareSync(
          credentials.pass,
          user.password
        );
        ///if true console.log
        if (authenticated) {
          req.currentUser = user;
          ///if false console.log
        } else {
          message = `Authentication failure for username: ${user.username}`;
        }
      })
      .catch((error) => {
        message = `User not found for username: ${credentials.name}`;
      });
  } else {
    console.log(credentials);
    message = "Auth header not found";
  }
  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};
