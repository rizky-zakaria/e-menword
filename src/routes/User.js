import express from "express"
import { login, register } from "../controllers/User.js"
import {body} from "express-validator"

const router = express.Router()

router.post('/users/login', [
    body('email', 'Invalid email address').notEmpty().escape().trim().isEmail(),
    body('password', 'Minimal 3 Karakter').notEmpty().escape().trim()
], login)
router.post('/users/register',[
    body('name', 'Minimal 3 Karakter').notEmpty().escape().trim().isLength({min: 3}),
    body('email', 'Invalid email address').notEmpty().escape().trim().isEmail(),
    body('password', 'Minimal 3 Karakter').notEmpty().escape().trim()
], register)

export default router;