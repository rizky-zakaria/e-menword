import express from "express"
import { index, store, update, show, destroy } from "../controllers/Sandi.js"
import {body} from "express-validator"

const router = express.Router()

router.get('/sandis', index)
router.post('/sandis',[
    body('account', 'Silahkan isi dengan data valid!').notEmpty().escape().trim().isLength({min: 3}),
    body('address', 'Silahkan isi dengan email valid!').notEmpty().escape().trim().isEmail(),
    body('password', 'Silahkan isi dengan data valid!').notEmpty().escape().trim().isLength({min: 8}),
], store)

router.put('/sandis/:id',[
    body('account', 'Silahkan isi dengan data valid!').notEmpty().escape().trim().isLength({min: 3}),
    body('address', 'Silahkan isi dengan email valid!').notEmpty().escape().trim().isEmail(),
    body('password', 'Silahkan isi dengan data valid!').notEmpty().escape().trim().isLength({min: 8}),
], update)

router.get('/sandis/:id', show);
router.delete('/sandis/:id', destroy);

export default router;