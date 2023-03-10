const express = require('express');
const path = require('path');
const app = express();
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRoute = require('./Routes/User');
let cors = require("cors");

dotenv.config();
Mongoose.set('strictQuery', true);
Mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("mongodb connected");
}).catch((err) => {
    console.log("no mongo connection" + err);
})
if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('./Client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html')));
}

app.use(cors());


app.use(express.json());
app.use('/user', UserRoute);




app.listen(5000 || process.env.PORT, () => {
    console.log("server started ....");
})