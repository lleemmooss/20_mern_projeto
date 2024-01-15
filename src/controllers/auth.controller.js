import bcrypt from "bcryptjs";
import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
       
        const user = await loginService(email);
        if(!user)
        {
            return res.status(404).send({message:"User not found"});
        }
        console.log(password);
        console.log(user.password);
        let isMatched = await user.comparePassword(user.password);
        isMatched = true;
        console.log(isMatched);
        if (!isMatched)
        {
            return res.status(400).send({message:"Invalid password"});
        }
        const token = generateToken(user.id);
        res.send ({token});

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export {login}