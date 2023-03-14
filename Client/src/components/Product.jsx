import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import { CartContext } from "../App";
import axios from "axios";
export const Product = ({ item }) => {
  const CounterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const [count, setcount] = useState(1);
  // const [id, setid] = useState(1);
  function setCounter(op) {
    if (op === "+") setcount(count + 1);
    else {
      if (count !== 0) setcount(count - 1);
    }
  }
  const Image = styled.img`
    width: 100%;
    height: 35vh;
    transition: transform 0.5s;
    :hover {
      transform: scale(1.1);
    }
  `;
  const Container = styled.div`
    transition: transform 0.5s;
    :hover {
      transform: scale(1.05);
    }
  `;
  const { cart, setcart } = React.useContext(CartContext);
  const { cartCount, setcartCount } = React.useContext(CartContext);
  // const id = useId();
  async function addCart(id) {
    // console.log(this.item);
    // console.log("itemId" + item._id);
    setcart([
      ...cart,
      {
        itemId: id,
        count: count,
        name: item.name,
        price: count * item.price,
        image: item.image
      },
    ]);
    console.log(cart);
    setcartCount(cartCount + 1);
    const data = await axios.post("https://veggyserver.onrender.com/user/addToCart", {
      userId: 123,
      itemId: id,
      name: item.name,
      price: count * item.price,
      image: item.image,
      count: count
    })
  }
  async function AddToCart(id) {
    console.log("id" + id);
    const item = await cart.find(i => i.itemId == id);
    // if (cart.length != 0) {
    // var itemid = id;
    console.log(item);
    console.log(cart);
    if (!item) {
      console.log("true");
      addCart(id);
    }
    else {
      // console.log(itemid);
      if (count!=1) {
        
        const cartitem = await axios.post("https://veggyserver.onrender.com/user/cartItemcount", {
          id: id,
          count:count
        })
      }else{
        const cartitem = await axios.post("https://veggyserver.onrender.com/user/cartItemcount", {
          id: id,
          count:1
        })
      }
      var i = cart.findIndex(x => x.itemId == id);
      var foundItem=cart[i];
      var c=foundItem.count;
      foundItem.count=count+c;
      var price=foundItem.price/c;
      foundItem.price=price*(count+c);
      cart[i]=foundItem;
    }
    // } else {
    //   addCart(id, item);
    // }


  }
  return (
    <Container>
      <Card
        style={{
          boxShadow: "1px 1px 9px 3px #077915",
          border: "1px solid #077915",
        }}
      >
        <CardContent>
          <Image src={item.image} alt="" />
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="h5"
            component="div"
          >
            {item.name}
          </Typography>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="h4"
            color="text.secondary"
          >
            ₹{item.price}
          </Typography>
          <CounterContainer>
            <RemoveIcon onClick={() => setCounter("-")} fontSize="large" />
            <TextField
              style={{ width: "10vh", marginTop: "5px" }}
              id="outlined-number"
              // label="Count"
              type="number"
              size="small"
              value={count}
            />
            <AddIcon onClick={() => setCounter("+")} fontSize="large" />
          </CounterContainer>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => AddToCart(item._id)}
            style={{ color: "white", backgroundColor: "#077915" }}
            size="medium"
          >
            ADD TO CART
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};
