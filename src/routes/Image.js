import express from "express"
import { store, index } from "../controllers/Image.js"
import {body} from "express-validator"

const router = express.Router()

router.get('/image', index)
router.post('/image', store)

export default router;