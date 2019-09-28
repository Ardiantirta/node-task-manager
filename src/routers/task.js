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

// GET /tasks?completed=true
// GET /tasks?limit=10&offset=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
  const match = {}
  const sort = {}
  
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.offset),
        sort
      }
    }).execPopulate()
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