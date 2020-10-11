const express = require("express");
const router = express.Router();

const { signup, signin, signout } = require("../controllers/auth");
const { userSignupValidator } = require("../validator");
const {requireSignin} =require("../controllers/auth")
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.get("/hello",requireSignin, (req,res)=>res.json("hello"));

module.exports = router;
