import makeCommentsDb from './comments-db'
import makeUsersDb from './users-db'
import mongodb from 'mongodb'
import Id from "../Id";

const MongoClient = mongodb.MongoClient
const url = process.env.FLEXIT_DB_URL
const dbName = process.env.FLEXIT_DB_NAME
const client = new MongoClient(url, { useNewUrlParser: true })

export async function makeDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(dbName)
}

const CommentsDb = makeCommentsDb({ makeDb })
const UsersDb = makeUsersDb({ makeDb, Id })

const db = Object.freeze({
  CommentsDb,
  UsersDb,
})

export default db
export { CommentsDb, UsersDb }