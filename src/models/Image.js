import { Sequelize } from "sequelize";
import db from "../configs/Database.js";

const {DataTypes} = Sequelize;

const Image = db.define('images', {
    image: DataTypes.STRING,
},{
    freezeTableName:true
})

export default Image;
(async()=>{
    await db.sync();
})()