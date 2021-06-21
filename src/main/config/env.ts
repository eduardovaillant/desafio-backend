import dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/desafio-backend',
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL || 'localhost:3000/api/planets/'
}
