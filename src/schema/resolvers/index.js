// TMP
const user0 = { id: 0, name: 'John Doe', email: 'john.doe@example.com' }
const user1 = { id: 1, name: 'Max Mustermann', email: 'max.mustermann@example.com' }
const user2 = { id: 2, name: 'Lahub Tatam', email: 'lahub.tatam@example.com' }

const users = [user0, user1, user2]


const resolvers = {
  Query: {
    me () {
      return user0
    },

    users () {
      return users
    }
  }
}

export default resolvers
