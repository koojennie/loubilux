const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(
    process.env.POSTGRES_DB_NAME,
    process.env.POSTGRES_DB_USER,
    process.env.POSTGRES_DB_PASS,
    {
        host: process.env.POSTGRES_DB_HOST,
        port: process.env.POSTGRES_DB_PORT,
        dialect: 'postgres',
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };