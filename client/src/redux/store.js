import { configureStore } from "@reduxjs/toolkit";

import loadSlice from "./features/loadSlice";
import userSlice from "./features/userSlice";

export default configureStore({
  reducer: {
    loading: loadSlice.reducer,
    user: userSlice.reducer,
  },
});
