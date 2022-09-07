import Sequelize from 'sequelize';

export default new Sequelize(
    'test',
    'postgres',
    "sdGf14km8joI!",
    {
        dialect: "postgres",
        host: "localhost",
        port: "5432"
    }
)
