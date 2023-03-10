const Mongoose = require('mongoose');


const CartSchema = new Mongoose.Schema(
    {
        userId:{
            type: Object,
            required:true
        },
        itemId:{
            type:String,
            require:true
        },
        name: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true
        },
        count:{
            type:Number
        },
        image: {
            type: String,
        },
        category: {
            type: String,
        }
    },
    {timestamps:true}
);

module.exports = Mongoose.model("cart",CartSchema);