import { MongoClient } from 'mongodb'

export default async (MONGO_URL) => {
  const db = await MongoClient.connect(MONGO_URL)
  return { Users: db.collection('users') }
}
