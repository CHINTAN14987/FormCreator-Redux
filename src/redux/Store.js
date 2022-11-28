import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import UserReducer from "./ReducerSlice";
import JsonTransFormationReducer from "./JsonTransFormationSlice";
const persistConfig = {
  key: "root",
  storage,
};
const RootReducer = combineReducers({
  UserReducer,
  JsonTransFormationReducer,
});
const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
