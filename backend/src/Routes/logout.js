import express from "express";
import logoutController from "../Controllers/logout.js";
const router = express.Router();

router.route("/").post(logoutController.logout);

export default router;