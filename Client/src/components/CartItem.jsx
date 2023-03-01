import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../App";
import axios from "axios";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border: 3px solid #077915;
  margin-bottom: 2vh;
`;
const Image = styled.img`
  flex: 1;
  width: 0px;
`;
const DetailContainer = styled.div`
  padding: 10px;
  flex: 4;
`;
const RemoveButton = styled.button`
  margin: 0;
  height: 40%;
  background-color: #077915;
  color: white;
  border-radius: 5px;
  margin: 5px 5px;
  padding: 5px;
`;
export const CartItem = ({ item, i, state, setstate }) => {
  const { cart, setcart } = useContext(CartContext);
  const { cartCount, setcartCount } = React.useContext(CartContext);
  console.log(item);
  async function removeItem(id) {
    const data = await axios.post("https://veggyserver.onrender.com/user/removeCartItem", {
      id: id
    })
    // console.log(data);
    if (data.status===200) {
      console.log(item._id);
      cart.splice(i, 1);
      console.log(cart);
      setcart(cart)
      setcartCount(cartCount-1);
      setstate(!state)
    }
  }
  if (item != null) {
    return (
      <Container>
        <Image src={item.image} />
        <DetailContainer>
          {item.name} <br></br> <p>Amount : ₹{item.price}</p> <p>count : {item.count}</p>
        </DetailContainer>
        <RemoveButton onClick={() => {

          removeItem(item._id);
        }}>Remove</RemoveButton>
      </Container>
    );
  }
  return <></>

};
