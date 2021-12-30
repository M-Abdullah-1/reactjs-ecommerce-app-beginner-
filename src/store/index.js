import { createSlice, configureStore } from "@reduxjs/toolkit";

const productsInitialState = {
  products: [
    {
      id: "id1640456185091",
      title: "Wireless Mouse",
      quantity: 67,
      isWished: false,
      imgUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8NnR-wpnwytOsLPlGZM5AQHaFj%26pid%3DApi&f=1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
      id: "id1640456187099",
      title: "Keyboard",
      quantity: 7,
      isWished: false,
      imgUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.KlrKWZ8-7Ssi_eMxb9in0gHaFV%26pid%3DApi&f=1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
    {
      id: "id1640456188174",
      title: "Headphone",
      quantity: 23,
      isWished: false,
      imgUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.tWBsqauCiZE7oMNzAHjaNQHaHa%26pid%3DApi&f=1",
      description:
        "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: "id1640456188812",
      title: "Laptop",
      quantity: 20,
      isWished: false,
      imgUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.PGanWUt9OS1leOVfKblAHwHaEK%26pid%3DApi&f=1",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
    },
    {
      id: "id1640456189497",
      title: "Bluetooth Handsfree",
      quantity: 25,
      isWished: false,
      imgUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.jW85HJqmimJdww8diWu76gHaIq%26pid%3DApi&f=1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ],
  wishList: [],
  cart: [],
  // { id: "id1640456189497" }, { id: "id1640456188812" }
};

const productsSlice = createSlice({
  name: "products",
  initialState: productsInitialState,
  reducers: {
    addToWishList(state, action) {
      state.wishList.push(action.payload);
      const itemIndex = state.products.findIndex(
        (el) => el.id === action.payload.id
      );
      state.products[itemIndex].isWished = true;
    },
    removeFromWishList(state, action) {
      const itemIndexWishList = state.wishList.findIndex(
        (el) => el.id === action.payload.id
      );
      state.wishList.splice(itemIndexWishList, 1);

      const itemIndex = state.products.findIndex(
        (el) => el.id === action.payload.id
      );
      state.products[itemIndex].isWished = false;
    },
    addCart(state, action) {
      const cartItemIndex = state.cart.findIndex(
        (el) => el.id === action.payload.id
      );
      if (cartItemIndex >= 0) {
        console.log("already in the cart...");
      } else {
        const wishListItemIndex = state.wishList.findIndex(
          (el) => el.id === action.payload.id
        );
        if (wishListItemIndex >= 0) {
          state.products.forEach((el) => {
            console.log(state.wishList[wishListItemIndex].id);
            if (el.id === state.wishList[wishListItemIndex].id) {
              const productIndex = state.products.findIndex(
                (el) => el.id === state.wishList[wishListItemIndex].id
              );
              state.products[productIndex].isWished = false;
              console.log("matcheddd....");
            }
          });
          state.wishList.splice(wishListItemIndex, 1);
        }
        state.cart.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      const cartItemIndex = state.cart.findIndex(
        (el) => el.id === action.payload.id
      );
      state.cart.splice(cartItemIndex, 1);
    },
  },
});

const store = configureStore({
  reducer: productsSlice.reducer,
});

export default store;

export const productActions = productsSlice.actions;
