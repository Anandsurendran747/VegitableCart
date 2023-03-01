import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchContext } from "../App";
import { Product } from "./Product";
import { Grid } from "@mui/material";
import axios from "axios";
export const Products = () => {
  const Products = styled.div`
    padding-top: 15vh;
    margin-bottom: 15vh;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  `;
  const SubCont = styled.div`
    @media only screen and (min-width: 1000px) {
      padding: 0 13vw;
    }
    padding: 0 5vw;
  `;
  const [items, setItems] = useState([]);
  const { filterKey } = React.useContext(SearchContext);

  useEffect(() => {
    axios
      .get(
        "https://veggyserver.onrender.com/user/vegitables"
      )
      .then((res) => {
        setItems(res.data);
      });
  }, [filterKey]);

  function search(items) {
    return items.filter((item) =>
      item.name.toLowerCase().startsWith(filterKey.toLowerCase())
    );
  }
  return (
    <Products>
      {/* <marquee  style={{marginBottom:"10px"}}>This site is not fully functional</marquee> */}
      <SubCont>
        <Grid container spacing={3}>
          {search(items).map((item, index) => {
            return (
              <Grid key={index} item xs={12} md={3}>
                <Product  item={item} />
              </Grid>
            );
          })}
        </Grid>
      </SubCont>
    </Products>
  );
};
