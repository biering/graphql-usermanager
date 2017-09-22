// TMP
const user0 = { id: 1, name: 'John Doe', email: 'john.doe@example.com' }
const user1 = { id: 2, name: 'Max Mustermann', email: 'max.mustermann@example.com' }
const user2 = { id: 3, name: 'Lahub Tatam', email: 'lahub.tatam@example.com' }

const users = [user0, user1, user2]

const Mutation = {
  createUser (_, payload) {
    // create user method
    const user = Object.assign({ id: `${users.length + 1}` }, payload)
    users.push(user)
    return user
  }
}

const resolvers = {
  Query: {
    me () {
      return user0
    },

    user (_, payload) {
      return users.find(u => u.id === payload.id)
    },

    allUsers (_, payload) {
      return users
    }
  },

  Mutation: Mutation
}

export default resolvers
