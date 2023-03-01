const Cart = require('../Models/Cart');
const User = require('../Models/User');
const Vegitables = require('../Models/Vegitables');

const router = require('express').Router();

router.get('/vegitables', async (req, res) => {
    try {
        const products = await Vegitables.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error });
    }

})


router.get('/getCart', async (req, res) => {
    try {
        const cart = await Cart.find();
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.post('/addToCart', async (req, res) => {
    const cartItem = new Cart(req.body);
    try {
        const cart = await cartItem.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.post('/cartItemcount',async (req,res)=>{
    try {
        const c=await Cart.findOne({itemId:req.body.id});
        console.log(this.checkout);
        var count=c.count;
        var price=c.price/count;
        if (!c.count) {
            count=1;
        }
        console.log(count);
        const cartItem= await Cart.findOneAndUpdate({itemId:req.body.id},{count:count+req.body.count,price:price*(req.body.count+count)});
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");

        const userAuth = await User.findOne({ password: req.body.password });
        !userAuth ? res.status(404).json("password uncorrect") : res.status(200).json({ user });


    } catch (error) {
        res.status(500).json({ error });
    }
})


router.post('/registerUser', async (req, res) => {
    const user = new User(req.body);
    try {
        const u = await user.save();
        res.status(200).json({ u });
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.post('/removeCartItem',async(req,res)=>{
    try {
        const cartitem=await Cart.findByIdAndDelete(req.body.id);
        res.status(200).json(cartitem);
    } catch (error) {
        res.status(500).json({ error });
    }
})
module.exports = router;