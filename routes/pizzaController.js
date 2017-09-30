const express = require('express')
//const router = express.Router({ mergeParams: true })
const router = express.Router()
const Schema = require("../db/schema.js");
const UserModel = Schema.UserModel;
//const PizzaModel = Schema.PizzaMode;
//const OrderModel = Schema.OrderModel;

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

module.exports = router