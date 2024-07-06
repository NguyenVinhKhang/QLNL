import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phoneNumber: '',
    role: '',
    token: '',
    id: '',
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', token = '', role = '', phoneNumber = '', _id = ''} = action.payload
            state.name = name ? name : state.name;
            state.email = email ? email : state.email;
            state.role = role ? role : state.role;
            state.phoneNumber = phoneNumber ? phoneNumber : state.phoneNumber;
            state.id = _id ? _id : state.id
            state.token = token ? token : state.token;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.role = '';
            state.phoneNumber = '';
            state.id = '';
            state.token = '';
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer