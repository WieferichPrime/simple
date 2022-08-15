import { DataTypes } from 'sequelize';
import connection from '../connection.js';
//const sequelize = new Sequelize('test','postgres',"sdGf14km8joI!", { dialect: 'postgres'});

const Record = connection.define("Record",
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
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        about: {
            type: DataTypes.TEXT('tiny')
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
            get() {
                return this.getDataValue('time').slice(0,5);
            }
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['date', 'time']
            }
        ],
        tableName: 'Records'
    }
);


export default Record;