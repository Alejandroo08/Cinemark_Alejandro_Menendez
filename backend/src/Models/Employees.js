import {Schema, model} from "mongoose";

const employeesSchema = new Schema ( 

    {

        name: {
            type: String,
            require: true
          },
        email: {
            type: String,
            require: true
        },
        password:{
            type: String,
            require: true,
            min:8

        },
        telephone:{
            type: Number,
            require: true,
            min: 8
        },
        address:{
           type: String,
           require:true
        },
        rol:{
            type: String,
            require: true
        },
        hiredate:{
            type: Date,
            require: true
        },
        salary:{
            type: Number,
            require: true,
        },
        dui:{
         type: String,
         require: true,
         min: 10
        }
        ,} , 
    
        {
            timestamps: true,
            strict: false 
         }

);

export default model("Employees", employeesSchema);