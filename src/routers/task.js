const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    creator: req.user._id
  })

  try {
    const response = await task.save()
    res.status(201).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/tasks', auth, async (req, res) => {
  try {
    await req.user.populate('tasks').execPopulate()
    res.status(200).send(req.user.tasks)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const response = await Task.findOne({ _id, creator: req.user._id })

    if (!response)
      return res.status(404).send()
      
    await response.populate('creator').execPopulate()

    res.status(200).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['completed', 'description']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: `Invalid updates!` })
  }

  try {
    const response = await Task.findOne({ _id, creator: req.user._id })

    if (!response) {
      res.status(404).send()
    }

    updates.forEach((update) => response[update] = req.body[update])
    await response.save()

    res.status(200).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const response = await Task.findOneAndRemove({ _id: req.params.id, creator: req.user._id })

    if (!response) {
      return res.status(400).send()
    }

    return res.status(200).send(response)
  } catch (err) {
    return res.status(500).send(err)
  }
})

module.exports = router