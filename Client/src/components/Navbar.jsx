import React from "react";
import { SearchContext } from "../App";
import AppBar from "@mui/material/AppBar";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../App";
import style from "styled-components";
import {Link, Outlet } from "react-router-dom";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));
const TitileContainer = style.div`
   flex:1;
   display:flex;
   align-items:center;
   justify-content:center;

`;
const ShoppingCartIconContainer = style.div`
   flex:1;
   display:flex;
   align-items:center;
   justify-content:end;

`;


function Navbar() {
  const { cart,setcart } = React.useContext(CartContext);
  const { cartCount } = React.useContext(CartContext);
  const { setfilterKey } = React.useContext(SearchContext);
  return (
    <div>
      <Box sx={{ flexGrow: 1}}>
        <AppBar style={{ backgroundColor: "#077915" }}>
          <Toolbar style={{ display: "flex" }}>
            <Search style={{ flex: 1 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setfilterKey(e.target.value)}
              />
            </Search>
            <TitileContainer>
              <h1>VEGGY</h1>
            </TitileContainer>

            <ShoppingCartIconContainer>
              <span style={{backgroundColor:"white",borderRadius:"50%",color:"black",padding:"2px",fontWeight:"200px"}}>{cartCount}</span>
              <Link to="/cart" style={{color:"white"}}><ShoppingCartIcon   fontSize="large" /></Link>
            </ShoppingCartIconContainer>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </div>
  );
}

export default Navbar;
