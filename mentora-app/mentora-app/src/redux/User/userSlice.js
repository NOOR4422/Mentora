import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    idUser: '',

};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SaveIdUser: (state,{ payload }) => {
            state.idUser = payload;
        },
    }
});

export const { SaveIdUser} = userSlice.actions;
export default userSlice.reducer;