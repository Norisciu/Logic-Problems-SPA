import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    availableUsers: [
        { id: '0', name: 'Tinna Jenkins' },
        { id: '1', name: 'Kevin Grant' },
        { id: '2', name: 'User Price' }
    ],

    loginUserId: "0"
};

const usersSlice = createSlice({
    name: "problem",
    initialState,
    reducers: {
        setLoginUser: (state, action) => {
            state.loginUserId = action.payload.userId;
        }
    }
})


export const { setLoginUser } = usersSlice.actions;
export default usersSlice.reducer;