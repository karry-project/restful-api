module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'https://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://thomasoum:dahasjabtuhik9!shirtivuc6@ds251894.mlab.com:51894/bringathing',
    JWT_SECRET: process.env.JWT_SECRET || 'secret'
}