import {createSlice} from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:"user",
    initialState:{
        user: false
    },
    reducers:{
        login(state){
            state.user = true;
        },
        logout(state){
            state.user = false;
        },
        
    },
});

export const authactions = userSlice.actions;

export default userSlice.reducer;