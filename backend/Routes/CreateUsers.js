const express = require("express");
const router = express.Router();
const user = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "Mynameisharshsethandiamamernstackdeveloper";

router.post(
  "/createuser",
  body("email", "Incorrect-Email").isEmail(),
  body("password", "Incorrect-Password").isLength({ min: 5 }),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() });
      // return res.status(400).json({err : err.array()[0].msg });
    }
    try {

      const salt = await bcryptjs.genSalt(10);
      const secPassword = await bcryptjs.hash(req.body.password, salt);

      const NewUser = new user({
        // name: "sham",
        // location: "hahaha",
        // email: "haks@gmail.com",
        // password: "123456"
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secPassword,
      });
      await NewUser.save();
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  body("email", "Incorrect-Email").isEmail(),
  body("password", "Incorrect-Password").isLength({ min: 5 }),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() });
    }
    let email = req.body.email;
    try {
      let userData = await user.findOne({ email: `${email}` });
      if (!userData) {
        return res
          .status(400)
          .json({ error: "Try login with correct credentials" });
      }

      let pwdCompare = await bcryptjs.compare(req.body.password,userData.password);

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ error: "Try login with correct credentials" });
      }

      const data = {
        user:{
          id: userData._id
        }
      }

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
