// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'node-task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  const db = client.db(databaseName)

  // db.collection('Users').insertOne({
  //   _id: id,
  //   name: 'Ardian Tirta',
  //   age: 23
  // }, (error, result) => {
  //   if (error) {
  //     return console.log(`Unable to insert user`)
  //   }
  //   console.log(result.ops)
  // })

  // db.collection('Users').insertMany([
  //   {
  //     name: 'Tirta',
  //     age: 23
  //   }, {
  //     name: 'Ardin',
  //     age: 23
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log(error)
  //   }

  //   console.log(result.ops)
  // })

  // db.collection('Tasks').insertMany([
  //   {
  //     description: 'task1',
  //     completed: false
  //   }, {
  //     description: 'task2',
  //     completed: true
  //   }, {
  //     description: 'task3',
  //     completed: false
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log(error)
  //   }

  //   console.log(result.ops)
  // })


})