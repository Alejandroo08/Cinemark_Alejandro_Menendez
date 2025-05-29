import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Token
import nodemailer from "nodemailer";
import crypto from "crypto";
import clientsModel from "../Models/Customers.js";

import {config} from "../../config.js";
import { error, info } from "console";

const registerClientController = {};

registerClientController.getCustomer = async (req, res) => {
    const customer = await clientsModel.find();
    res.json(customer);

}

 registerClientController.registerCustomer = async (req, res) => {

    const {

        name,
        email,
        password,
        telephone,
        address,
        dui
    } = req.body;

    try {
        const existingClient = await clientsModel.findOne({email})

        if(existingClient){
            return res.json({message: "Client alredy exists"})
        }

        const passwordHash = await bcryptjs.hash(password, 10)

        const newClient = new clientsModel(
            {
                name,
                email,
                password : passwordHash,
                telephone,
                address,
                dui: dui || null
            }
        )

        await newClient.save()

        jsonwebtoken.sign(

            {id: newClient._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
        (error, token) => {
            if(error) console.log("error", error);

            res.cookie("authToken", token)
            res.json({message: "cliente guardado"})
            
        }
        )

    } catch (error) {
        res.json({message: "error"+ error })
    }
}


registerClientController.deleteCustomer= async (req, res) => {

    await clientsModel.findOneAndDelete(req.params.id)

    res.json({message: "Eliminado"})
}


registerClientController.updateCustomer = async (req,res) => {

    const passwordHash = await bcryptjs.hash(password, 10)


    const { 
        name,
        email,
        password,
        telephone,
        address,
        dui} = req.body;

    await movieModel.findByIdAndUpdate(req.params.id, {
        name,
        email,
        password: passwordHash,
        telephone,
        address,
        dui}, {new: true});

    res.json({message: "customer updated "})
}


export default registerClientController;