import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import scoreSlice from "../features/scoreSlice";

const store = configureStore({
    reducer: {
        score: scoreSlice
    },
    middleware: [thunkMiddleware],
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch