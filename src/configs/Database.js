import { Sequelize } from "sequelize";

const db = new Sequelize('e-menword', 'root', 'admin',{
    'host': 'localhost',
    'dialect': 'mysql'
})

export default db;