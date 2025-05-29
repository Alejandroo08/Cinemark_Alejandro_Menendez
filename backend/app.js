import express from "express";
import cookieParser from "cookie-parser";
import moviesRoutes from "./src/Routes/MoviesRoutes.js"
import customerRoutes from "./src/Routes/CustomersRoutes.js"
import employeeRoutes from "./src/Routes/EmployessRoutes.js"
import loginRoutes from "./src/Routes/login.js";
import logoutRoutes from "./src/Routes/logout.js";

import recoveryPasswordRoutes from "./src/Routes/recoveryPassword.js"

const app = express();

app.use(express.json())

app.use(cookieParser())  


app.use(express.json());
app.use("/api/movies", moviesRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/employee", employeeRoutes);

app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);

app.use("/api/recovery", recoveryPasswordRoutes);


export default app;