const express = require('express')
const router = express.Router({ mergeParams: true })
// const router = express.Router()
const Schema = require("../db/schema.js");
const UserModel = Schema.UserModel;
const PizzaModel = Schema.PizzaModel;
const OrderModel = Schema.OrderModel;

// INDEX
router.get('/', (request, response) => {
   
    const UserId = request.params.userId

    UserModel.findById(UserId)
        .then((user) => {
            response.render('pizza/index', {
                user: user
            })
        })
        .catch((error) => {
            console.log(error)
        })

})

// NEW route
router.get('/new', (request, response) => {

    const userId = request.params.userId
    const orderId = request.params.orderId
    console.log("New route console" + orderId)
      response.render('pizza/new', {
        userId: userId,
        orderId: orderId

    })
})

// CREATE route
router.post('/', (request, response) => {

    const userId = request.params.userId
    const newOrder = new OrderModel(request.body)
    console.log(newOrder)

    UserModel.findById(userId)
        .then((user) => {
            user.orders.push(newOrder)
            return user.save()
        })
        .then((user) => {
            response.redirect(`/users/${userId}/orders/${newOrder._id}/pizza`)
        })
        .catch((error) => {
            console.log(error)
        })

})

// EDIT route
router.get('/:orderId/edit', (request, response) => {

    const userId = request.params.userId
    const orderId = request.params.orderId
    
    UserModel.findById(userId)
        .then((user) => {
            const order = user.orders.id(orderId)

            response.render('orders/edit', {
                order: order,
                userId: userId
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// UPDATE route
router.put('/:orderId', (request, response) => {

    const userId = request.params.userId
    const orderId = request.params.orderId
    const updatedOrder= request.body
    
    UserModel.findById(userId)
        .then((user) => {
            const order = user.orders.id(orderId)
//this needs to all aspects of order in it
            order.name = updatedOrder.name
            //order.price = updatedOrder.price

            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/orders/${orderId}`)
        })

})

// SHOW route
router.get('/:orderId', (request, response) => {

    const userId = request.params.userId
    const orderId = request.params.orderId

    UserModel.findById(userId)
        .then((user) => {
            const order = user.orders.id(orderId)

            response.render('orders/show', {
                order: order,
              userId: userId
            })
        })
        .catch((error) => {
            console.log(error)
       })
})

// DELETE route
router.get('/:orderId/delete', (request, response) => {

    const userId = request.params.userId
    const orderId = request.params.orderId

    UserModel.findById(userId)
        .then((user) => {
            const order = user.orders.id(orderId).remove()

            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${orderId}/orders`)
        })
        .catch((error)=>{
            console.log(error)
        })
})


module.exports = router
