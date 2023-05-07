import Image from '../models/Image.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {validationResult} from 'express-validator'
import FileUpload from "express-fileupload"
import path from "path"
import md5 from "md5"

export const index = async(req, res, next)=>{
    const tgl = new Date();
    // const tgl = "a"
    const tglcons = md5(tgl)
    res.json({message: tglcons})
}


export const store = async(req, res, next) => {
    if(req.files === null) return res.status(400).json({message: "No file upload"})
    const name = req.body.title
    const file = req.files.file
    const filesize = file.data.length
    const ext = path.extname(file.name)
    const tgl = new Date();
    const filename = md5(tgl) + ext
    const url = `${req.protocol}://${req.get("host")}/images/${filename}`
    const allowedType = ['.png', '.jpg', 'jpeg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({status: "false", message: "Extensi tidak diizinkan"})

    if(filesize > 5000000) return res.status(422).json({status: "false", message: "Image terlalu besar"})

    file.mv(`./public/images/${filename}`, async(err)=>{
        if(err) return res.status(422).json({message: err.message})

        try {
            await Image.create({
                image: filename
            })

            res.status(201).json({
                status: 'true',
                message: 'Berhasil mengupload gambar'
            })
        } catch (error) {
            next(error)
        }

    })
}