import mongo from 'mongodb'

const toObjId = (id) =>
  new mongo.ObjectID(id)

// TMP
const user0 = { id: 1, name: 'John Doe', email: 'john.doe@example.com' }

const Mutation = {
  async createUser (root, payload, { mongo: { Users } }) {
    const response = await Users.insert(payload)
    return Object.assign({ _id: response.insertedIds[0] }, payload)
  }/*,

  async updateUser (root, payload, { mongo: { Users } }) {
    const response = await Users.update({ _id: toObjId(payload.id) }, )
    return Object.assign({ _id: response.insertedIds[0] }, payload)
  }*/
}

const resolvers = {
  Query: {
    me () {
      return user0
    },

    async user (root, payload, { mongo: { Users } }) {
      const user = await Users.findOne({ _id: toObjId(payload.id) })
      if (user) { user.id = user._id }
      return user
    },

    async allUsers (root, payload, { mongo: { Users } }) {
      const users = await Users.find({}).toArray()
      return users.map(user => Object.assign({ id: user._id }, user))
    }
  },

  Mutation: Mutation
}

export default resolvers
