import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { toast } from 'react-toastify';

const baseUrl = "http://localhost:3000/"
// const baseUrl = "https://todo-list-app-backend-ra0j.onrender.com/"
export const fetchUserSignIn = createAsyncThunk("fetchUserSignIn", async ({ name, email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}api/auth/createUser`, { name, email, password });
        return response.data;

    } catch (error) {
        console.log(error)
        toast("loading")
        return rejectWithValue(error.response.data.message);
    }
});

export const fetchUserLogin = createAsyncThunk("fetchUserLogin", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}api/auth/login`, { email, password });
        console.log(response)
        return response.data;
        
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});


export const userSlice = createSlice({
    name: 'user',
    initialState: { todos: ""},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserSignIn.fulfilled, (state, action) => {
                const { success, authToken } = action.payload
                if (success) {
                    localStorage.setItem('token', authToken)
                }
            })
            .addCase(fetchUserSignIn.rejected, (state, action) => {
                toast.error(action.payload)
            })

            .addCase(fetchUserLogin.fulfilled, (state, action) => {
                const { success, authToken } = action.payload
                if (success) {
                    localStorage.setItem('token', authToken)
                }
            })
            .addCase(fetchUserLogin.rejected, (state, action) => {
                toast.error(action.payload)
            })
    }
})


export default userSlice.reducer
