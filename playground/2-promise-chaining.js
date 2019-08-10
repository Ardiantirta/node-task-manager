require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findOneAndRemove({ _id: '5d42fbb9970e3d1a88801c36'})
//   .then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
//   }).then((tasks) => {
//     console.log(tasks)
//   }).catch((e) => {
//     console.log(e)
//   })

const removeTaskAndDoCount = async (_id,) => {
  const removedTask = await Task.findOneAndRemove({ _id })
  const countTask = await Task.countDocuments({ completed: false })
  return { removedTask, countTask }
}

removeTaskAndDoCount('5d4c3565d99dd92928150ae8')
  .then(({removedTask, countTask}) => {
    console.log(removedTask, countTask)
  }).catch((e) => {
    console.log(e)
  })