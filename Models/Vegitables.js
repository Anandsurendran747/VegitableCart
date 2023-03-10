const Mongoose = require('mongoose');


const VegitableSchema = new Mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true
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

module.exports = Mongoose.model("vegitable",VegitableSchema);