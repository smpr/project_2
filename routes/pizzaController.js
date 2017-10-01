const express = require('express')
//const router = express.Router({ mergeParams: true })
const router = express.Router()
const Schema = require("../db/schema.js");
const UserModel = Schema.UserModel;
const PizzaModel = Schema.PizzaMode;
const OrderModel = Schema.OrderModel;

// INDEX
router.get('/', (request, response) => {
   
    const UserId = request.params.userId

    UserModel.findById(UserId)
        .then((user) => {
            response.render('pizza/new', {
                user: user
            })
        })
        .catch((error) => {
            console.log(error)
        })

})
router.post('/', (request, response) => {
  
      const userId = request.params.userId
      const newOrder= request.body
  
      UserModel.findById(userId)
          .then((user) => {
              user.orders.push(newOrder)
              return user.save()
          })
          .then((user) => {
              response.redirect(`/users/${userId}/orders`)
          })
  
  })
module.exports = router