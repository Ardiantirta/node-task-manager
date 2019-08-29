const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const User = require('../models/user')

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user: user.getPublicProfile(), token })
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })

    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save()
    
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
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
    updates.forEach((update) => req.user[update] = user[update] )
    await req.user.save()

    res.status(200).send(req.user)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {

    await req.user.remove()

    res.status(200).send(req.user)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router