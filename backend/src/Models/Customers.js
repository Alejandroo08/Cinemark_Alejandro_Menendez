import {Schema, model} from "mongoose";

const customersSchema = new Schema ( 

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
        dui:{
         type: String,
         min: 10
        }
        ,} , 
    
        {
            timestamps: true,
            strict: false 
         }

);

export default model("Customers", customersSchema);