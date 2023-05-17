import mongoose from "mongoose";

export const connectDB = async () => {


    const uri = process.env.MONGODB_URL || "mongodb://localhost/myapp";

    try {
        const { connection } = await mongoose.connect(uri);
        console.log(`Database is connected sucessfully on ${connection.host}`)
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }

};

