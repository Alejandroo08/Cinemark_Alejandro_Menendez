import employeesModel from "../Models/Employees.js"
import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Token
import { config } from "../config.js"


const registerEmployeeController = {};

registerEmployeeController.getEmployee = async (req, res) => {
    const employee = await employeesModel.find();
    res.json(employee);

}
//insert 

registerEmployeeController.register = async(req, res)=> {
    const {
        name,
        email,
        password,
        telephone,
        address,
        rol,
        hiredate,
        salary,
        dui,
    } = req.body
 
    try {
        
        const existEmployee = await employeesModel.findOne({email})
        if(existEmployee) {
            return res.json({message: "El empleado ya existe"})
        }
          const passwordHash = await bcryptjs.hash(password, 10)
 
        const newEmployee = new employeesModel({
        name,
        email,
        password:passwordHash,
        telephone,
        address,
        rol,
        hiredate,
        salary,
        dui,
        })
 
        await newEmployee.save();

        jsonwebtoken.sign(

            {id: newEmployee._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
        (error, token) => {
            if(error) console.log("error", error);

            res.cookie("authToken", token)
            res.json({message: "empleado guardado"})
            
        }
        )
       
    } catch (error) {
     console.log("error" + error)
     res.json({message: "Empleado no guardado"})  
    }
}




registerEmployeeController.deleteEmployee= async (req, res) => {

    await employeesModel.findOneAndDelete(req.params.id)

    res.json({message: "Eliminado"})
}


registerEmployeeController.updateEmployee = async (req,res) => {

    const passwordHash = await bcryptjs.hash(password, 10)


    const { 
        email,
        password,
        telephone,
        address,
        rol,
        hiredate,
        salary,} = req.body;

    await employeesModel.findByIdAndUpdate(req.params.id, {
        email,
        password:passwordHash,
        telephone,
        address,
        rol,
        hiredate,
        salary}, {new: true});

    res.json({message: "Empleado Actualizado "})
}

export default registerEmployeeController