import { configureStore } from "@reduxjs/toolkit";
import authReducer from "pages/Auth/authSlice";
import shipmentReducer from "./shipmentRedux";
import statisticReducer from "./statisticRedux";
import userReducer from "./userRedux";

export default configureStore({
  reducer: {
    auth: authReducer,
    shipment: shipmentReducer,
    statistic: statisticReducer,
    user: userReducer,
  },
});
