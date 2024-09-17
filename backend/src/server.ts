import express from 'express'
import userRoutes from './routes' 
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors())

const PORT = process.env.PORT

const connectDB = async () => {
  try {
    const dbURI = process.env.CONNECTIONSTRING as string
    await mongoose.connect(dbURI)
    console.log('Conectado ao MongoDB')
  } catch (error) {
    console.error('Falha ao conectar no MongoDB:', error)
    process.exit(1)
  }
}
app.use(express.json())

app.use('/api/users', userRoutes)

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
  })
}

startServer()