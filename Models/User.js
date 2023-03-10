const Mongoose = require('mongoose');


const UserSchema = new Mongoose.Schema(
    {
        userId:{
            type: Object,
            required:true
        },
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
        },
        phone: {
            type: Number,
        }
    },
    {timestamps:true}
);

module.exports = Mongoose.model("user",UserSchema);