import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { CartContext } from "../App";
import { CartItem } from "../components/CartItem";

const Conatiner = styled.div`
  width: 80%;
  padding-top: 15vh;
  height: 100%;
  margin: 0 10%;
  display: flex;
`;
const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ItemDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  border-radius:20px;
  border: 4px solid #077915;
`;
const OrderButton = styled.button`
  background-color: #077915;
  color: white;
  margin:5px;
  border-radius:50px;
  flex: 1;
  padding: 5px;
`;
export const Cart = () => {
  const { cart,setcart } = React.useContext(CartContext);
  useEffect(() => {
    setcart(cart)
    console.log(cart);
  }, [cart])
  const [first, setfirst] = useState(false)
  var totalPrice=0;
  cart.map((item)=>{
    totalPrice=totalPrice+item.price;
  })
  return (
    <Conatiner>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ItemsContainer>
            {cart.map((item, index) => {
              return <CartItem key={index} i={index} item={item} state={first} setstate={setfirst} />;
            })}
          </ItemsContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <ItemDetailContainer>
            {/* <p style={{ flex: 1, fontSize: "25px", fontWeight: "200" }}>
              Price Details:{" "}
            </p> */}
            {/* <br /> */}
            <p style={{ flex: 3, fontSize: "25px", fontWeight: "500" ,padding:"10px"}}>
              Total Amount = ₹{totalPrice}
            </p>
            <OrderButton onClick={()=>alert("This feature will come soon..")}>Place order</OrderButton>
          </ItemDetailContainer>
        </Grid>
      </Grid>
    </Conatiner>
  );
};
