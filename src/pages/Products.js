import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Grid, Container } from "@mui/material";
import { useSelector } from "react-redux";

function Products() {
  const products = useSelector((state) => state.products);
  return (
    <Fragment>
      <Container>
        <Grid spacing={2} sx={{ my: 5 }} container>
          {products.map((product) => {
            return (
              <Grid key={product.id} sm={4} item>
                <ProductCard
                  id={product.id}
                  title={product.title}
                  imageUrl={product.imgUrl}
                  isWished={product.isWished}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Fragment>
  );
}

export default Products;
