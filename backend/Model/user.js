import { DataTypes } from 'sequelize'
import sequelize from '../db/conn.js'

const User = sequelize.define('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nascimento: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default User