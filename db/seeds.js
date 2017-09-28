require('dotenv').config();

var mongoose = require('mongoose');
var Schema = require("./schema.js");

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("database has been installed! Now go break stuff!");
});

var ToppingModel = Schema.ToppingModel;
var PizzaModel = Schema.PizzaModel;
var UserModel = Schema.UserModel;
var OrderModel = Schema.OrderModel;
UserModel.remove({}, function (err) {
    console.log(err);
});
//user
const bob = new UserModel({ name: 'Bob Barker', address: '125 Generic Street', phone:'4045555555'})
const bill = new UserModel({ name: 'Bill Barker', address: '225 Generic Street', phone:'4045555556'})
const stew = new UserModel({ name: 'Stew Barker', address: '325 Generic Street', phone:'4045555557'})
//order
const order1 = new OrderModel({ name: 'First Order', pickup: true}) 
const order2 = new OrderModel({ name: 'Second Order', pickup: true}) 
const order3 = new OrderModel({ name: 'Third Order', pickup: false}) 
//pizza
const pizza1 = new PizzaModel({size: 'Large'})
const pizza2 = new PizzaModel({size: 'Medium'})
const pizza3 = new PizzaModel({size: 'Small'})
//topping
const topping1 = new ToppingModel({flavor: 'Cheese'})
const topping2 = new ToppingModel({flavor: 'Sausage'})
const topping3 = new ToppingModel({flavor: 'Pineapple'})

const users = [bob, bill, stew]
const orders = [order1, order2, order3]
const pizzas = [pizza1, pizza2, pizza3]
const toppings = [topping1, topping2, topping3]

// Here we assign some projects to each student.
users.forEach((user) => {

    user.order = orders
    //order.pizza = pizza
    //pizza.topping = topping
    user.save()
        .then((user) => {
            console.log(`${user.name} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
    //order.save()
    //    .then((user) => {
    //        console.log(`${order.name} saved!`)
    //    })
    //    .catch((error) => {
    //        console.log(error)
    //    })
});

// Disconnect from database
db.close();