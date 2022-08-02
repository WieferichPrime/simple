import Sequelize from 'sequelize';

export default new Sequelize(
    'test',
    'postgres',
    "sdGf14km8joI!",
    {
        dialect: "postgres",
        host: "192.168.1.189",
        port: "5432"
    }
)
