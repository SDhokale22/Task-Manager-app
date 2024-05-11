import express from "express";
import { Login, Logout, Signup } from "../controller/userController.js";

const router = express.Router();

router.route("/signup").post(Signup);
router.route("/login").post(Login);
router.route("/logout").get(Logout);

export default router;