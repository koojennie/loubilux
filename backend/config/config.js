require('dotenv').config();

module.exports = {
    development: {
        username: process.env.POSTGRES_DB_USER,
        password: process.env.POSTGRES_DB_PASS,
        database: process.env.POSTGRES_DB_NAME,
        host: process.env.POSTGRES_DB_HOST,
        port: process.env.POSTGRES_DB_PORT,
        dialect: process.env.POSTGRES_DB_DRIVER
    },
    test: {
        username: process.env.POSTGRES_DB_USER,
        password: process.env.POSTGRES_DB_PASS,
        database: process.env.POSTGRES_DB_NAME,
        host: process.env.POSTGRES_DB_HOST,
        port: process.env.POSTGRES_DB_PORT,
        dialect: process.env.POSTGRES_DB_DRIVER
    },
    production: {
        username: process.env.POSTGRES_DB_USER,
        password: process.env.POSTGRES_DB_PASS,
        database: process.env.POSTGRES_DB_NAME,
        host: process.env.POSTGRES_DB_HOST,
        port: process.env.POSTGRES_DB_PORT,
        dialect: process.env.POSTGRES_DB_DRIVER
    }
}; 