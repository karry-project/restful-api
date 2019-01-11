module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'https://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://karry-admin:karryproject2019@ds125422.mlab.com:25422/karry',
    JWT_SECRET: process.env.JWT_SECRET || 'secret'
}