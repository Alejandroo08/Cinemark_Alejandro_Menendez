import express from "express";
import logoutController from "../Controllers/logut.js";
const router = express.Router();

router.route("/").post(logoutController.logout);

export default router;