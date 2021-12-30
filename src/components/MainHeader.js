import * as React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@mui/material";

export default function ButtonAppBar() {
  const history = useHistory();
  const wishListProducts = useSelector((state) => state.wishList);
  const cartItems = useSelector((state) => state.cart);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            onClick={() => history.push("/products")}
            sx={{ color: "white" }}
          >
            <Typography variant="h5">E-Commerce</Typography>
          </Button>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "end",
            }}
          >
            <IconButton
              size="small"
              color="primary"
              sx={{ mr: 2, color: "white" }}
              onClick={() => history.push("/wishlist")}
            >
              <Badge badgeContent={wishListProducts.length} color="secondary">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              sx={{ mr: 2, color: "white" }}
              onClick={() => history.push("/cart")}
            >
              <Badge badgeContent={cartItems.length} color="warning">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
