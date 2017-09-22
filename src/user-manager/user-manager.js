
const makeUserManager = ({ connection, emailService }) => ({

  createUser: name => {
    connection.table('users')
      .insert({
        is_new: true,
        full_name: name
      })
      .then(user => user.id)
  },

  removeUser: id => {
    connection.table('users')
      .delete(id)
  },

  updateUser: args => {

  },

  banUser: name => {

  }

})

export default makeUserManager
