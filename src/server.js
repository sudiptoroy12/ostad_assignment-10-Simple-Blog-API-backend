import express from "express";
import dotenv from "dotenv"
import blogRoutes from "./routes/blog.route.js"


import connectDB from "./db/db.js"

dotenv.config()


const app = express()

const PORT = process.env.PORT || 8000;

app.use(express.json())



app.use("/api",blogRoutes)



connectDB()
.then(()=> {
    app.listen(PORT, () => {
        console.log(`Server is running successfully at port : ${PORT}`);
        
    })
}).catch((err) => {
    console.log("MongoDB connection failed !!!", err)
})