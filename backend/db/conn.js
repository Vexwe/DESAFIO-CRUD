import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'todolist',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        logging: console.log
    }
)

export default sequelize