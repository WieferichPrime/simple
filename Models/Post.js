import { DataTypes } from 'sequelize';
import connection from '../connection.js';
//const sequelize = new Sequelize('test','postgres',"sdGf14km8joI!", { dialect: 'postgres'});

const Post = connection.define("Post",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING
        },
    },
    {
        tableName: 'Posts'
    }
);


export default Post;