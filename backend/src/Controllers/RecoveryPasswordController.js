import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import employeesModel from "../Models/Employees.js";
import customersModel from "../Models/Customers.js";


import { sendEmail, HTMLRecoveryEmail } from "../../src/Controllers/Utils//mailPasswordRecovery.js";
import { config } from "../../config.js";
import { verify } from "crypto";
import { error } from "console";




const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) => {

    const {correo} = req.body;

    try {
        let userFound;
        let userType;
    
        userFound = await employeesModel.findOne({ correo });
    
        if (userFound) {
            userType = "employee";
        } else {
            userFound = await clientsModel.findOne({ correo });
            if (userFound) {
                userType = "customer";
            } else {
                return res.json({ message: "User not found" });
            }
        }
    
        const code = Math.floor(10000 + Math.random() * 90000).toString();
    
        const token = jsonwebtoken.sign(
            { correo, code, userType, verified: false },
            config.JWT.secret,
            { expiresIn: "20m" }
        );
    
        res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });
    
        await sendEmail(
            correo,
            "Codigo de Verificacion",
        
            HTMLRecoveryEmail(code)
        );
    
        res.json({ message: "Codigo Enviado" });
    
    } catch (error) {
        console.log("Error: " + error);
    }
    
    }

    passwordRecoveryController.verifyCode = async (req, res) => {

        const {code} = req.body;

        try {
            
            const token = req.cookies.tokenRecoveryCode;

            const decoded = jsonwebtoken.verify(token, config.JWT.secret)

            if(decoded.code !== code){

                return res.json({message: "Codigo Invalido"})
            }


            const newToken = jsonwebtoken.sign({
                correo: decoded.correo,
                code: decoded.code,
                userType: decoded.userType,
                verified: true
            },
        
            config.JWT.secret,

            {expiresIn: "20m"}
        )

        res.cookie("tokenRecoveryCode", newToken, {maxAge: 20*60*100})

        res.json({message: "Codigo Verificado Exitosamente"})

           

        } catch (error) {
            console.log("error" + error)

        }

    }


    passwordRecoveryController.newPassword = async (req, res) => {
        const { newPassword } = req.body;

     try {
        console.log("Cookies:", req.cookies);

        const token = req.cookies.tokenRecoveryCode;

        console.log("token:", token);


        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if(!decoded.verified){
            return res.json({message: "Codigo no verificado"})
        }

        const {correo, userType} = decoded;
        
        const hashedPassword = await bcryptjs.hash(newPassword,10)

        let updateUser;

        if (userType === "employee") {
            updateUser = await employeesModel.findOneAndUpdate(

                {correo},
                {contrasenia: hashedPassword},
                {new: true}
            );
        } else {
            if ((userType === "customer")) {
                updateUser = await customersModel.findOneAndUpdate(
                    {correo},
                    {contrasenia: hashedPassword},
                    {new: true}
                ); 
            }   else {
                return res.json({ message: "User not found" });
            }
        }
       

        res.clearCookie("tokenRecoveryCode")

        res.json({message: "Password updated"})

     } catch (error) {
        console.log("error" + error)
     }
    }


export default passwordRecoveryController