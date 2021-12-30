import { Route, Switch, Redirect } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Products from "./pages/Products";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Error404 from "./pages/Error404";
import ProductDetail from "./pages/ProductDetail";
import { Fragment } from "react";
// import Welcome from "./pages/Welcome";

function App() {
  return (
    <Fragment>
      <MainHeader />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/products" />
        </Route>
        <Route path="/products" exact>
          <Products />
        </Route>
        <Route path="/products/:productId">
          <ProductDetail />
        </Route>
        <Route path="/wishlist">
          <WishList />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
