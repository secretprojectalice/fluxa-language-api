import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import languageItemRoutes from "./routes/languageItemRoutes"

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use((req, res, next) => {
    if (
        req.method !== 'OPTIONS' &&
        req.headers['origin'] &&
        req.headers['origin'] !== process.env.FLUXA_UI_APP_URL
    ) {
        return res.status(403).send({
            error: 'Only Fluxa UI is allowed to reach Language API',
        })
    }

    next()
})

const apiRouter = express.Router()
apiRouter.use("/language", languageItemRoutes)
app.use("/api/v1", apiRouter)

mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log("Fluxa MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err))

export default app