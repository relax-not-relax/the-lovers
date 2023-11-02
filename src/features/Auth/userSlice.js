import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StorageKeys from '../../constants/storage-keys';
import userAPI from '../../api/userApi';

export const register = createAsyncThunk(
    'users/register',
    async (payload) => { //payload: tham so truyen vao
        //call API to register
        const data = await userAPI.register(payload);

        //return user data
        return data;
    }
)

export const login = createAsyncThunk(
    'users/login',
    async (payload) => { //payload: tham so truyen vao
        //call API to register
        const data = await userAPI.login(payload);

        localStorage.setItem(StorageKeys.TOKEN, data.accessToken);
        localStorage.setItem(StorageKeys.REFRESH, data.refreshToken);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.account));

        //return user data
        return data.account;
        //return data;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        settings: {},
    },
    reducers: {
        logout(state) {
            //clear local storage
            localStorage.removeItem(StorageKeys.USER);
            localStorage.removeItem(StorageKeys.TOKEN);
            localStorage.removeItem(StorageKeys.REFRESH);

            state.current = {};
        },

        updateInformation(state, action) {
            const currentUser = state.current;

            const {
                email,
                fullName,
                dateOfBirth,
                phone,
                address,
                avatarLink,
                description,
            } = action.payload;

            state.current = {
                ...currentUser,
                email: email || currentUser.email,
                fullName: fullName || currentUser.fullName,
                dateOfBirth: dateOfBirth || currentUser.dateOfBirth,
                phone: phone || currentUser.phone,
                address: address || currentUser.address,
                avatarLink: avatarLink || currentUser.avatarLink,
                description: description || currentUser.description,
            };

            const updatedUser = { ...currentUser, ...state.current };
            localStorage.setItem(StorageKeys.USER, JSON.stringify(updatedUser));
        }
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    }
});

const { actions, reducer } = userSlice;
export const { logout, updateInformation } = actions;
export default reducer;