import { config } from 'dotenv';
config();
import { connectDB } from './config/database.js';
import Product from './models/productsModel.js';
import ProductJson from './products.json' assert { type: 'json' };

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();
        await Product.create(ProductJson);
        console.log("json data successfully saved");
    } catch (error) {
        console.error(error.message)
    }
}


start();

