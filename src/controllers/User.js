import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {validationResult} from 'express-validator'

export const register = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }


    try {

        const email = await User.findOne({
            where:{
                email: req.body.email,
            }
        })

        if(email !== null){
            res.json({
                status: "false",
                message: "Email sudah terdaftar"
            })
        }

        const data = {
                "name": req.body.name,
                "email": req.body.email,
                "password": await bcrypt.hash(req.body.password, 12)
            }

        await User.create(data);
        res.status(201).json({
            message: "Berhasil melakukan registrasi"
        })

    } catch (error) {
        next(error)
    }
}

export const login = async(req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(402).json({ errors: errors.array() })
    }

    try {
        const data = await User.findOne({
            where:{
                email: req.body.email,
            }
        })

        const passwordVerify = bcrypt.compareSync(req.body.password, data.password)

        if(!passwordVerify){
            res.json({
                status: 'false',
                message: 'Password salah!'
            })
        }

        if (data === null) {
            res.status(401).json({
                message: "Gagal melakukan login!",
                data: data
            })
        }else{

            const token = jwt.sign({id:data.id}, "SECRET", {expiresIn: '1h'})
            res.status(200).json({
                message: "Berhasil melakukan login!",
                data: data,
                token: token
            })
        }


    } catch (error) {
        next(error)
    }
}