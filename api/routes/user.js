var express = require("express");
var router = express.Router();
var { Users } = require("../models");
const { authenticateUser } = require("../middleware/auth-user");

//user get route
router.get("/", authenticateUser, (req, res, next) => {
  console.log("Current User ", req.currentUser);
  Users.findOne({
    where: { id: req.currentUser.id },
  })
    .then((users) => {
      res.status(200);
      res.json(users).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(400);
      res.json(error).end();
    });
});
//user post route
router.post("/", (req, res, next) => {
  // const user = req.body;

  Users.create(
    req.body
    // firstName: user.firstName,
    // lastName: user.lastName,
    // emailAddress: user.emailAddress,
    // password: user.password,
  )
    .then(res.location("/"))
    .then((userInfo) => {
      res.status(201).json(userInfo);
      res.end();
    })
    // .then((user) => {
    //   res.status(201).json(user);
    //   res.end();
    // })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
      res.end();
    });
});

module.exports = router;
