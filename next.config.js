require('dotenv').config();

module.exports = {
    env: {
        MONGO_URI: process.env.MONGO_URI,
        CLOUDINARY_URL: process.env.CLOUDINARY_URL,
        BASE_URL: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_ENV_BASE_URL : process.env.DEVELOPMENT_ENV_BASE_URL
    }
}