import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {

    try {
        const {authorization} = req.headers;
       
        if (!authorization)
        {
             return res.send(401);
        }

        const parts = authorization.split(" ");

        const [schema, token] = parts;

        if (parts.length !== 2) {
            return res.send(401);
        }

        if (schema !== "Bearer") {
            return res.send(401);
        }
        //console.log(parts);
        jwt.verify(token, process.env.SECRET, async (error, decoded) => {
            if (error) {
                return res.status(401).send({message: "Invalid token returned"});
            }
            //console.log(decoded);
            const user = await userService.findByIdService(decoded.id);
            if (!user || !user.id) {
                return res.status(401).send ({message: "User not found or invalid user id"});
            }
            req.userId = user.id;
            //console.log(req.userId);
            return next();
            });
                
        
    } 
    catch (err) {
        res.status(500).json({message: err.message});
    };
}