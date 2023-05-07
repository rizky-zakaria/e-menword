import Sandi from '../models/Sandi.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {validationResult} from 'express-validator'

export const index = async(req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty){
        res.status(422).json({errors: errors.array()})
    }

    try {
        
        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            res.status(422).json({
                status: "false",
                message: "Token invalid"
            })
        }

        const data = await Sandi.findAll()

        if(data.affectedRow > 0){
            res.json({
                status: "true",
                message: "Berhasil mendapatkan data!",
                data: data
            })
        }

        res.status(404).json({
            status: "false",
            message: "Gagal mendapatkan data!"
        })

    } catch (err) {
        next(err)
    }

}

export const store = async(req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(422).json({errors: errors.array()})
    }

    try {
        
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            res.status(422).json({
                status: "false",
                message: "Token invalid"
            })
        }


        const store = await Sandi.create(req.body)
        if(store.id > 0){
            res.status(201).json({
                status: "true",
                message: "Berhasil menambahkan data!"
            })
        }
        res.status(400).json({
            status: "false",
            message: "Gagal menambahkan data!",
        })

    } catch (err) {
        next(err)
    }
}

export const update = async(req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(422).json({errors: errors.array()})
    }

    try {
        
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            res.status(422).json({
                status: "false",
                message: "Token invalid"
            })
        }

        await Sandi.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        res.status(201).json({
            status: "true",
            message: "Berhasil mengubah data!"
        })

    } catch (err) {
        next(err)
    }

}

export const show = async(req, res, next) => {

    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            res.status(422).json({
                status: "false",
                message: "Token invalid"
            })
        }

        const data = await Sandi.findOne({
            where:{
                id: req.params.id
            }
        })

        if (data.id > 0) {
            res.status(200).json({
                status: 'true',
                message: "Berhasil mendapatkan data",
                data: data
            })
        }

        res.status(200).json({
                status: 'false',
                message: "Gagal mendapatkan data"
            })

    } catch (err) {
        next(err)
    }

}

export const destroy = async(req, res, next) => {

    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            res.status(422).json({
                status: "false",
                message: "Token invalid"
            })
        }

        const data = await Sandi.destroy({
            where:{
                id: req.params.id
            }
        })

        res.status(200).json({
            status: 'true',
            message: "Berhasil menghapus data"
        })

    } catch (err) {
        next(err)
    }

}