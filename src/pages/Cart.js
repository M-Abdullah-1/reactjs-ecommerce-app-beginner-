import React, { useState, useEffect, Fragment } from "react";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../store/index";
import ListCard from "../components/ListCard";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const [cartItemsState, setCartItemsState] = useState([]);

  useEffect(() => {
    cartItems.forEach((pr) => {
      if (!cartItemsState.find((el) => el.id === pr.id)) {
        setCartItemsState((prev) => {
          return [...prev, products.find((p) => p.id === pr.id)];
        });
      }
    });
  }, [cartItems, cartItemsState, products]);

  const removeCartItemHandler = (productId) => {
    dispatch(productActions.removeFromCart({ id: productId }));
    setCartItemsState([]);
  };

  return (
    <Fragment>
      <Container sx={{ my: 4 }}>
        {cartItemsState.map((item) => (
          <ListCard
            key={item.id}
            id={item.id}
            title={item.title}
            imgUrl={item.imgUrl}
            onRemove={removeCartItemHandler}
            useOfPurpose="cart"
          />
        ))}
        {cartItemsState.length <= 0 && <h1>Nothing in the Cart.....</h1>}
      </Container>
    </Fragment>
  );
}

export default Cart;
