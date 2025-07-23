import express from "express";
import { login, logout, signUp } from "../controller/user.controller.js";
const router = express.Router();

// User sign up route
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);


// Export the router
export default router;