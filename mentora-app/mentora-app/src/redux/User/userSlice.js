import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    idUser: '',
    nameUser: '',
    profilePictureUser: '',

};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SaveIdUser: (state,{ payload }) => {
            state.idUser = payload;
        },
        SaveNameUser: (state,{ payload }) => {
            state.nameUser = payload;
        },
        SavePhotoUser: (state,{ payload }) => {
            state.profilePictureUser = payload;
        },
    }
});

export const { SaveIdUser,SaveNameUser,SavePhotoUser} = userSlice.actions;
export default userSlice.reducer;