const mongoose = require('mongoose');

// First, we instantiate a namespace for our Schema constructor defined by mongoose.
const Schema = mongoose.Schema;
//const toppingSchema = new Schema({
//    flavor: {
//        type: String,
//        required: true
//    }
//})
const pizzaSchema = new Schema({
   pizzasize: {
        type: String,
        
    },
    toppingOne: String,
    toppingTwo: String,
    toppingThree: String
    //topping: [toppingSchema],
  //this is where the pricce will go (reach)
});
const orderSchema = new Schema({
    name: {
        type: String,
        
        
    },
    pickup: {
        type: String,
    },
    pizza: [pizzaSchema]
});
const userSchema = new Schema({
   
    
    first: {
        type: String,
    //    required: true
    },
    last: {
        type: String,
    //    required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    orders:[orderSchema]
});


//const ToppingModel = mongoose.model('Topping', toppingSchema)
const PizzaModel = mongoose.model('Pizza', pizzaSchema)
const UserModel = mongoose.model('User', userSchema)
const OrderModel = mongoose.model('Order', orderSchema)

module.exports = {
   //// ToppingModel: ToppingModel,
    PizzaModel: PizzaModel,
    UserModel: UserModel,
    OrderModel: OrderModel
}