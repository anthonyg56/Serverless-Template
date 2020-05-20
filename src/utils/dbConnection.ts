// Get connection to mongoDb
import { Connection, createConnection, ConnectionOptions } from "mongoose"

let conn: any = null

const MONGO_URI = process.env.MONGO_URI as string

const DbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
}

export const getConnection = async (): Promise<Connection> => {
  if (conn === null) {
    conn = await createConnection(MONGO_URI, DbOptions)
  }
  return conn
}
