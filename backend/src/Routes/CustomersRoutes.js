import express from "express";
import customerController from "../Controllers/RegisterCustomersController.js";


const router = express.Router();

router.route("/")
.get(customerController.getCustomer)
.post(customerController.registerCustomer)

router.route("/:id")
.put(customerController.updateCustomer)
.delete(customerController.deleteCustomer)


export default router;