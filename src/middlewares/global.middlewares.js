import {createService,
        findAllService,
        findByIdService,
        updateService} from "../services/user.service.js";
import mongoose from "mongoose";

export const validateId = (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message:"Invalid Id"});
        }
    next();
    } catch (err) {
        res.status(500).json({message: err.message});
    };
};

export const validateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await findByIdService(id);
        
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }

        req.id = id;
        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({message: err.message});
    };
};

export default { validateId, validateUser };
