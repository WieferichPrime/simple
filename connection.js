import Sequelize from 'sequelize';

export default new Sequelize(
    'test',
    'postgres',
    "root",
    {
        dialect: "postgres",
        host: "localhost",
        port: "5432"
    }
)
