const { Router } = require("express");
const {
  register,
  login,
  logout
} = require('../controllers/user.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);

module.exports = router;
