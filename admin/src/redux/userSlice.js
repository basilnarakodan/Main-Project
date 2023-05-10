import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "",
        tocken: null
    },
    reducers: {
        update: (state, action) => {
            state.username=action.payload.username;
            state.tocken=action.payload.tocken;
        }
    }
})

export const {update}=userSlice.actions;
export default userSlice.reducer;