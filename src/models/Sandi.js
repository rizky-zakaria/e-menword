import { Sequelize } from "sequelize";
import db from "../configs/Database.js";

const {DataTypes} = Sequelize;

const Sandi = db.define('sandis', {
    account: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING
},{
    freezeTableName:true
})

export default Sandi;
(async()=>{
    await db.sync();
})()