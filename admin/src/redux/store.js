import { configureStore } from '@reduxjs/toolkit'
import Reducer from "./userSlice"

const store = configureStore({
    reducer: {
        user: Reducer,
    },
});

export default store
