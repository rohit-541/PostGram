import { connectDataBase } from "./Configurations/mongoose.js";
import app from "./index.js";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT,async ()=>{
    console.log(`Server is Listening on port number ${process.env.PORT}`);
    await connectDataBase();
})