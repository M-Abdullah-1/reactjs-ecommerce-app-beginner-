import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { productActions } from "../store/index";
import {
  Card,
  Paper,
  Typography,
  CardMedia,
  IconButton,
  Box,
  Button,
} from "@mui/material";

function ListCard(props) {
  const dispatch = useDispatch();

  const removeHandler = () => {
    props.onRemove(props.id);
  };

  const cartHandler = () => {
    const productId = { id: props.id };
    dispatch(productActions.addCart(productId));
    removeHandler();
  };

  let iconBox = "";

  if (props.useOfPurpose === "wishList") {
    iconBox = (
      <Button variant="contained" onClick={cartHandler}>
        Add to Cart
      </Button>
    );
  }
  if (props.useOfPurpose === "cart") {
  }

  return (
    <Paper sx={{ my: 1 }} elevation={2}>
      <Card sx={{ p: 1, display: "flex", alignItems: "center" }}>
        <CardMedia
          sx={{ maxWidth: 100 }}
          component="img"
          height="auto"
          image={props.imgUrl}
          alt="green iguana"
        />
        <Typography variant="h5" sx={{ ml: 2, flexGrow: 1 }}>
          {props.title}
        </Typography>
        <Box sx={{ mr: 2 }}>
          {iconBox}
          <IconButton
            size="small"
            color="primary"
            sx={{ ml: 2 }}
            onClick={removeHandler}
          >
            <CancelIcon />
          </IconButton>
        </Box>
      </Card>
    </Paper>
  );
}

export default ListCard;
