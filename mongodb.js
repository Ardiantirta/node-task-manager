// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'node-task-manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

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

  // db.collection('Users').findOne({
  //   _id: new ObjectID('5d3ea93ac86faa1cb0bd997c')
  // }, (error, result) => {
  //   if (error) {
  //     return console.log(error)
  //   }

  //   console.log(result)
  // })

  // db.collection('Users').find({ age: 23 }).toArray((error, result) => {
  //   console.log(result)
  // })

  // db.collection('Users').find({ age: 23 }).count((error, result) => {
  //   console.log(result)
  // })

  // db.collection('Tasks').findOne({
  //   _id: new ObjectID("5d3eae0eadf6e71f7012a0e5")
  // }, (error, response) => {
  //   if (error) {
  //     return console.log(error)
  //   }

  //   console.log(response)
  // })

  // db.collection('Tasks').find({
  //   completed: false
  // }).toArray((error, response) => {
  //   console.log(response)
  // })

  // db.collection('Users').updateOne({
  //   _id: new ObjectID('5d3eab25d13bda41ac28616c')
  // }, {
  //   $inc: {
  //     age: 3
  //   }
  // }).then((response) => {
  //   console.log(`success ${response}`)
  // }).catch((err) => {
  //   console.log(`err ${err}`)
  // })

  const updateManyPromises = db.collection('Tasks').updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    }
  })

  updateManyPromises.then((response) => {
    console.log(`success ${response}`)
  }).catch((err) => {
    console.log(`error ${err}`)
  })

})
