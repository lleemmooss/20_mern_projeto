import mongoose from "mongoose";


export const connectDatabase = async () => {
    try {
        console.log ("Waiting for database connection");
        await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,
            useUnifiedTopology: true});
            
        console.log ("Database connection established");    
    }
    catch (err) {
        console.log(err);
    }
};

export default connectDatabase;

