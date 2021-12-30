import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/index";
import SimpleSnackBar from "./SimpleSnackBar";
import {
  Button,
  CardActions,
  IconButton,
  Paper,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function MultiActionAreaCard(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector((state) => state.cart);
  const [elevationState, setElevationState] = useState(10);
  const [isWish, setIsWish] = useState(props.isWished);
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

  const mouseEnterHandler = () => {
    setElevationState(24);
  };
  const mouseLeaveHandler = () => {
    setElevationState(10);
  };

  const addWishHandler = () => {
    const cartItemIndex = cartItems.findIndex((el) => el.id === props.id);
    if (cartItemIndex >= 0) {
      handleClick();
      return;
    }
    const wishListProduct = { id: props.id };
    dispatch(productActions.addToWishList(wishListProduct));
    setIsWish(true);
  };
  const removeWishHandler = () => {
    const wishListProduct = { id: props.id };
    dispatch(productActions.removeFromWishList(wishListProduct));
    setIsWish(false);
  };

  const cartHandler = () => {
    const cartItemIndex = cartItems.findIndex((el) => el.id === props.id);
    if (cartItemIndex >= 0) {
      handleClick();
      return;
    }
    const productId = { id: props.id };
    dispatch(productActions.addCart(productId));
    setIsWish(false);
  };

  return (
    <Paper
      elevation={elevationState}
      sx={{ maxWidth: 300 }}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <Card sx={{ p: 2 }}>
        <CardMedia
          component="img"
          height="auto"
          image={props.imageUrl}
          alt="green iguana"
        />
        <Divider sx={{ mt: 2 }} variant="middle" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "end" }}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => history.push(`/products/${props.id}`)}
          >
            <VisibilityIcon />
          </IconButton>
          {!isWish && (
            <IconButton size="small" color="primary" onClick={addWishHandler}>
              <FavoriteBorderIcon />
            </IconButton>
          )}

          {isWish && (
            <IconButton
              size="small"
              color="primary"
              onClick={removeWishHandler}
            >
              <FavoriteIcon />
            </IconButton>
          )}

          <Button variant="contained" onClick={cartHandler}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
      <SimpleSnackBar
        isOpen={open}
        handleClose={handleClose}
        msg="Already in the cart..."
      />
    </Paper>
  );
}
