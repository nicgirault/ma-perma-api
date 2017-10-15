module.exports = {
  database: {
    dialect: 'postgresql',
    host: process.env.APP_DB_HOST || 'localhost',
    port: process.env.APP_DB_PORT || '5432',
    username: process.env.APP_DB_USER || 'mapermauser',
    password: process.env.APP_DB_PASSWORD || 'mapermapassword',
    database: process.env.APP_DB_NAME || 'maperma'
  },
  port: process.env.APP_PORT || 8010
}
