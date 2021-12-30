import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SimpleSnackBar from "../components/SimpleSnackBar";
import {
  Typography,
  Card,
  Paper,
  Container,
  CardMedia,
  Box,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import { productActions } from "../store/index";

function ProductDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const products = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart);
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [isWish, setIsWish] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const productIndex = products.findIndex((p) => p.id === params.productId);
    setProduct(products[productIndex]);
    setIsWish(product.isWished);
  }, [products, params, product]);

  function qtyInc() {
    if (product.quantity > qty) {
      setQty(qty + 1);
    }
  }

  function qtyDec() {
    if (qty > 1) {
      setQty(qty - 1);
    }
  }

  const addWishHandler = () => {
    const cartItemIndex = cartItems.findIndex((el) => el.id === product.id);
    if (cartItemIndex >= 0) {
      handleClick();
      return;
    }
    const wishListProduct = { id: product.id };
    dispatch(productActions.addToWishList(wishListProduct));
    setIsWish(true);
  };
  const removeWishHandler = () => {
    const wishListProduct = { id: product.id };
    dispatch(productActions.removeFromWishList(wishListProduct));
    setIsWish(false);
  };

  const cartHandler = () => {
    const cartItemIndex = cartItems.findIndex((el) => el.id === product.id);
    if (cartItemIndex >= 0) {
      handleClick();
      return;
    }
    const productId = { id: product.id };
    dispatch(productActions.addCart(productId));
    setIsWish(false);
  };

  return (
    <Container sx={{ my: 5 }}>
      <Paper elevation={10}>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Grid container>
            <Grid sm={5} item sx={{ display: "flex", alignItems: "center" }}>
              <Paper elevation={10} sx={{ p: 4, m: 4 }}>
                <CardMedia
                  component="img"
                  height="auto"
                  image={product.imgUrl}
                  alt="green iguana"
                />
              </Paper>
            </Grid>
            <Grid
              sx={{ px: 10, display: "flex", alignItems: "center" }}
              sm={7}
              item
            >
              <Box sx={{ py: 4 }}>
                <Typography variant="h3" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                  Quantity: {product.quantity}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {product.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button sx={{ mr: 2 }} variant="contained" onClick={qtyInc}>
                      +
                    </Button>
                    <Typography sx={{ mr: 2 }} variant="h6">
                      {qty}
                    </Typography>
                    <Button variant="contained" onClick={qtyDec}>
                      -
                    </Button>
                  </Box>
                  <Box>
                    {!isWish && (
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={addWishHandler}
                        sx={{ mr: 2 }}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    )}

                    {isWish && (
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={removeWishHandler}
                        sx={{ mr: 2 }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    )}
                    <Button variant="contained" onClick={cartHandler}>
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Paper>
      <SimpleSnackBar
        isOpen={open}
        handleClose={handleClose}
        msg="Already in the cart..."
      />
    </Container>
  );
}

export default ProductDetail;
