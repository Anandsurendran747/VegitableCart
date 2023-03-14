import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Products } from "./components/Products";
import { Cart } from "./pages/Cart";
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
export const SearchContext = React.createContext();
export const CartContext = React.createContext();
function App() {
  const [filterKey, setfilterKey] = useState("");
  const [cart, setcart] = useState([]);
  const [cartCount, setcartCount] = useState(0)
  useEffect(() => {
    axios.get("https://veggyserver.onrender.com/user/getCart").then((data) => {
      setcart(data.data.cart);

      setcartCount(data.data.cart.length);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className="App">
      
      <SearchContext.Provider value={{ filterKey, setfilterKey }}>
        <CartContext.Provider value={{ cart, setcart, cartCount, setcartCount }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navbar />}>
                <Route index element={<Products />} />
                <Route path="cart" element={<Cart />} />
              </Route>
            </Routes>
          </BrowserRouter>
          {/* <Cart/> */}
        </CartContext.Provider>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
