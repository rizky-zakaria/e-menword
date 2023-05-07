import express from "express"
import cors from "cors"
import User from "./src/routes/User.js"
import Sandi from "./src/routes/Sandi.js"
import Image from "./src/routes/Image.js"
import FileUpload from "express-fileupload"

const app = express()
app.use(cors())
app.use(express.json())
app.use(FileUpload())
app.use(User)
app.use(Sandi)
app.use(Image)

app.listen(3000, ()=> console.log("Server is Running"))