//this script is made to compare prehashed and hashed password value//

import bcrypt from "bcrypt";
import Models from "../models/models.js";
import{ getUserByEmail, err_500 } from "../controllers/ModelController.js"

export const loginAttempt = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = getUserByEmail;
        const match = await bcrypt.compare(password,user.pswd_hash);
        if(!match) return res.status(401).json({error: "Wrong Password"});
        res.json(user);

    }catch(error){
        err_500(res,error);
    }
};