import { createService, 
        findAllService, 
        findByIdService, 
        updateService,
        deleteService } from "../services/user.service.js";


export const create = async (req, res) => {
    try {
        const { name, 
                username, 
                email, 
                password, 
                avatar, 
                background } = req.body;
    
        if (!name || !username || !email || !password || !avatar || !background) {
            res.status(400).json({message: "Submit all fields for registration"});
        }

        const user =  await createService(req.body);

        if (!user) {
            return res.status(400).json({message: "Error creating user"});
        }

        res.status(201).json({
                message: "Create user successfully!", 
                user: {
                        id: user._id,
                            name,
                            username,
                            email,
                            avatar,
                            background,
                       }
               
        })
    } catch (err) {
        res.status(500).json({message: err.message});
    };
};

export const findAll = async (req, res) => {
    try {
      const users = await findAllService();

        if (users.length === 0) {
            return res.status(400).json({message:"No users found"});
        }
        res.send(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    };
}

export const findById = async (req, res) => {
    try {
    
        /*SUBSTITUÍDO PELO MIDDLEWARE
        if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({message:"Invalid Id"});
        }*/
    
         const user = req.user;
        /*/*SUBSTITUÍDO PELO MIDDLEWARE
        if (!user) {
        return res.status(400).json({message:"User not found"});
        }*/
        res.send(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    };
}

export const updateById = async (req, res) => {
    try {
        const { name, 
            username, 
            email, 
            password, 
            avatar, 
            background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            res.status(400).json({message: "Submit at least one field for update"});
        }
    
    
        /*/*SUBSTITUÍDO PELO MIDDLEWARE  
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message:"Invalid Id"});
         }*/

        const {id, user} = req;

        /*/*SUBSTITUÍDO PELO MIDDLEWARE
        if (!user) {
            return res.status(400).json({message:"User not found"});
        }*/

        await updateService (
            id,
            name, 
            username, 
            email, 
            password, 
            avatar, 
            background
        );
        res.status(200).json({message:"User successfully updated!"})
        } catch (err) {
            res.status(500).json({message: err.message});
        };
    }

export const deleteById = async  (req, res) => {
    try {
        const id = req.id;
        console.log(id);
        await deleteService(id);
        res.status(200).json({message: "User deleted successfully"});    
    } catch (err) {
        res.status(500).json({message: err.message});
    };

}


export default { create, findAll, findById, updateById, deleteById };