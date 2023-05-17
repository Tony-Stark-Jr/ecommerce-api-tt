import { config } from 'dotenv';
config();
import express from "express";
import router from "./routes/usersRoutes.js";
const app = express();
const PORT = process.env.PORT;
import { connectDB } from './config/database.js';

connectDB();





// Using users routes
app.use('/api/v1', router)

app.listen(PORT, () => {
    console.log(`App running successfully on http://localhost:${PORT}`)
})

