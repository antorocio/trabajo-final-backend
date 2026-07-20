import { connect } from "mongoose"
import { config } from 'dotenv'
config()


const connectDb = async () => {
    try {
        await connect(process.env.MONGO_URI)
        console.log("Conectado a MongoDb")
    } catch (error) {
        console.log("Error al conectarse a MongoDb", error.message)
    }
}

export { connectDb }