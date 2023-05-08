import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import postsReducer from "./slices/posts";

const rootReducer = combineReducers({
    userReducer,
    postsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TRootDispatch = typeof store.dispatch;
