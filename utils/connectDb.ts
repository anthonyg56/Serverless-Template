import mongoose , { ConnectionOptions } from 'mongoose'

interface Connection {
    isConnected: number | null
}

const ConnectDb = async () =>  {
  const connection: Connection = {
    isConnected: null
  }
  if (connection.isConnected === 1) {
    console.log("Using existing connection")
    return
  }

  const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}

  const uri = process.env.MONGO_URI

  console.log('Connecting to DB')
  const db = await mongoose.connect(uri, dbOptions)

  console.log('Connected to DB')
  connection.isConnected = db.connections[0].readyState
}

export default ConnectDb