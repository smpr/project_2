const express = require('express')
const router = express.Router({ mergeParams: true })

const Schema = require("../db/schema.js");
const UserModel = Schema.UserModel;

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
