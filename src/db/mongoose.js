const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/node-task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})
