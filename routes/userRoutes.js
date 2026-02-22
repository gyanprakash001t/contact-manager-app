const express = require("express");
const router = express.Router();
const {registerUser,loginUser, currentUser} = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser);
router.post("/login", loginUser)

// router.get("/current", currentUser)
// since this is private route we now  add validation
router.get("/current", validateToken, currentUser);


module.exports = router
