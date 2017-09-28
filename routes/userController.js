const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js");
const UserModel = Schema.UserModel;

// INDEX route
router.get('/', (request, response) => {

    // FIND all of the companies in the database
    UserModel.find({})
        .then((users) => {

            // THEN once they come back from the database
            // RENDER them in Handlebars
            response.render('users/index', {
                users: users
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// NEW route
router.get('/new', (request, response) => {
  response.render('users/new')
})

// CREATE route
router.post('/', (request, response) => {

  const newUser = request.body

  UserModel.create(newUser)
      .then(() => {
          response.redirect('/users')
      })
      .catch((error) => {
          console.log(error)
      })
})

// EDIT route
router.get('/:userId/edit', (request, response) => {

  const userId = request.params.userId

  UserModel.findById(userId)
      .then((company) => {
          response.render('users/edit', {
              user: user
          })
      })
})

// UPDATE route
router.put('/:userId', (request, response) => {

  const userId = request.params.userId
  const updatedUser = request.body

  UserModel.findByIdAndUpdate(UserId, updatedUser, { new: true })
      .then(() => {
          response.redirect(`/users/${UserId}`)
      })
})

// SHOW route
router.get('/:userId', (request, response) => {

  const userId = request.params.userId

  UserModel.findById(userId)
      .then((user) => {
          response.render('users/show', {
              user: user
          })
      })
      .catch((error) => {
          console.log(error)
      })
})

// DELETE route
router.get('/:userId/delete', (request, response) => {

  const userId = request.params.userId

  UserModel.findByIdAndRemove(UserId)
      .then(() => {
          response.redirect('/Users')
      })
})

module.exports = router;
