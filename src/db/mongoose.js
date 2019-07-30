const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/node-task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error(`password cannot contain 'password'`)
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number!')
      }
    }
  }
})

const Tasks = mongoose.model('Tasks', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

// const me = new User({
//   name: '  Ardin  ',
//   email: 'ARDIANTIRTAA@GMAIL.COM',
//   password: 'Password123',
//   age: 23
// })

// me.save().then((response) => {
//   console.log(response)
// }).catch((err) => {
//   console.log(`Error ${err}`)
// })

const task1 = new Tasks({
  description: 'Task2',
  completed: false
})

task1.save((err, response) => {
  if (err) {
    return console.log(`Error ${err}`)
  }

  console.log(response)
})


