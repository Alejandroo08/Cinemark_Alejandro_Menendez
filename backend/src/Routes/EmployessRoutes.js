import express from "express";
import employeeController from "../Controllers/RegisterEmployeesController.js";


const router = express.Router();

router.route("/")
.get(employeeController.getEmployee)
.post(employeeController.register)

router.route("/:id")
.put(employeeController.updateEmployee)
.delete(employeeController.deleteEmployee)


export default router;