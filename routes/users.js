const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");

// profile  routes
router.get("/profile", userController.profile);

// sign-in routes
router.get("/sign-in", userController.signIn);

// sign-up routes
router.get("/sign-up", userController.signUp);

//  routes for create a new user
router.post("/create", userController.create);

// router for user login and create session 
router.post("/create-session", userController.createSession);

module.exports = router;