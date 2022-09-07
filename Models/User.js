import { DataTypes } from 'sequelize';
import connection from '../connection.js';

const User = connection.define("Users",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'admin', 'root'],
            allowNull: false,
            defaultValue: 'user'
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['email']
            },
            {
                unique: true,
                fields: ['password']
            }
        ],
        tableName: 'Users'
    }
);


export default User;