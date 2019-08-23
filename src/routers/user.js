const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/users', async (req, res) => {
  try {
    const response = await User.find({})
    res.status(200).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
  const _id = req.params.id
  const user = req.body
  const updates = Object.keys(user)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: `Invalid updates!`})
  }

  try {
    // without middleware
    // const response = await User.findOneAndUpdate({ _id }, user, { new: true, runValidators: true })

    // with middleware
    const response = await User.findOne({ _id })

    if (!response) {
      return res.status(404).send()
    }
    updates.forEach((update) => response[update] = user[update] )
    await response.save()

    res.status(200).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    const response = await User.findOneAndRemove({ _id: req.params.id })

    if (!response) {
      return res.status(400).send()
    }

    res.status(200).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router