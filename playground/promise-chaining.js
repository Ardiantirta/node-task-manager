require('../src/db/mongoose')
const User = require('../src/models/user')

// 5d42f89d411f9c25e8413b79
// User.findOneAndUpdate({ _id: '5d42f89d411f9c25e8413b79' }, { age: 23 })
//   .then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 23})
//   }).then((users) => {
//     console.log(users)
//   }).catch((e) => {
//     console.log(e)
//   })

const updateAgeAndCount = async (_id, age) => {
  const user = await User.findOneAndUpdate({ _id }, { age })
  const count = await User.countDocuments({ age })
  return { user, count}
}

updateAgeAndCount('5d42f89d411f9c25e8413b79', 23)
  .then(({user, count}) => {
    console.log(user, count)
  }).catch((e) => {
    console.log(e)
  })
