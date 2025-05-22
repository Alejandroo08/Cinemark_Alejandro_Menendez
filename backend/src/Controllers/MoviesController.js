import movieModel from "../Models/Movies.js";

import { config } from "../config.js";

import {v2 as cloudinary} from "cloudinary";


cloudinary.config({
    cloud_name: config.CLOUDINARY.cloudinary_name,
    api_key: config.CLOUDINARY.cloudinary_api_key,
    api_secret: config.CLOUDINARY.cloudinary_api_secret

})

const moviesController = {};

moviesController.getAllMovies = async(req,res) => {

    const movies = await movieModel.find();
    res.json(movies);
}

moviesController.insertMovies = async (req,res) =>{
    const {title, description,director,genre,year,duration} = req.body;
    let imageURL = "";

    if(req.file){
        const result = await cloudinary.uploader.upload(
            req.file.path,{
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg"]
            }
        )

        imageURL = result.secure_url
    }

    const newMovie = new movieModel({title,description,director,genre,year,duration,image: imageURL})
    newMovie.save();

    res.json({message: "Movie saved "})
}


moviesController.deleteMovies = async (req, res) => {

    await movieModel.findOneAndDelete(req.params.id)

    res.json({message: "Eliminado"})
}

moviesController.updateMovies = async (req,res) => {

    const {title,description,director,genre,year,duration} = req.body;

    let imageURL = "";

    if(req.file){
        const result = await cloudinary.uploader.upload(
            req.file.path,{
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg"]
            }
        )

        imageURL = result.secure_url
    }

    await movieModel.findByIdAndUpdate(req.params.id, {title,description,director,genre,year,duration,image: imageURL}, {new: true});

    res.json({message: "movie updated "})
}

export default moviesController;