const express = require('express')

require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/users', async (req, res) => {
  try {
    const response = await User.find({})
    res.status(200).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/users/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const response = await User.findById(_id)
    if (!response)
      return res.status(404).send()

    res.status(200).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    const response = await task.save()
    res.status(201).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/tasks', async (req, res) => {
  try {
    const response = await Task.find({})
    res.status(200).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const response = await Task.findById(_id)
    if (!response)
      return res.status(404).send()
      
    res.status(200).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})
