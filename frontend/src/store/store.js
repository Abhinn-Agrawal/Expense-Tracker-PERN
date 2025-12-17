import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "./financeSlice";

export const store = configureStore({
  reducer: {
    finance: financeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
