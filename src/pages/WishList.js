import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListCard from "../components/ListCard";
import { productActions } from "../store/index";
import { Container } from "@mui/material";

function WishList() {
  const wishList = useSelector((state) => state.wishList);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [wishListProducts, setWishListProducts] = useState([]);

  useEffect(() => {
    wishList.forEach((el) => {
      if (!wishListProducts.find((product) => product.id === el.id)) {
        setWishListProducts((prev) => {
          return [...prev, products.find((product) => product.id === el.id)];
        });
      }
    });
  }, [products, wishList, wishListProducts]);

  const wishListProductsStateHandler = () => {
    setWishListProducts([]);
  };

  const removeWishHandler = (productId) => {
    const wishListProduct = { id: productId };
    dispatch(productActions.removeFromWishList(wishListProduct));
    wishListProductsStateHandler();
  };

  return (
    <div>
      <Container sx={{ my: 4 }}>
        {wishListProducts.map((el) => (
          <ListCard
            key={el.id}
            id={el.id}
            title={el.title}
            imgUrl={el.imgUrl}
            onRemove={removeWishHandler}
            useOfPurpose="wishList"
          />
        ))}
        {wishListProducts.length <= 0 && <h1>Nothing in the WishList....</h1>}
      </Container>
    </div>
  );
}

export default WishList;
