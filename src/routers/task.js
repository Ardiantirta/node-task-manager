const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    const response = await task.save()
    res.status(201).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/tasks', async (req, res) => {
  try {
    const response = await Task.find({})
    res.status(200).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['completed', 'description']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: `Invalid updates!` })
  }

  try {
    // without middleware
    // const response = await Task.findOneAndUpdate({ _id }, req.body, { new: true, runValidators: true })

    //with middleware
    const response = await Task.findOne({ _id })

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

router.delete('/tasks/:id', async (req, res) => {
  try {
    const response = await Task.findOneAndRemove({ _id: req.params.id })

    if (!response) {
      return res.status(400).send()
    }

    return res.status(200).send(response)
  } catch (err) {
    return res.status(500).send(err)
  }
})

module.exports = router