import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';

interface UserState {
    user: User | null;
    isLoading: boolean;
}

const initialState: UserState = {
    user: null,
    isLoading: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoading = false;
        },
    },
});

export const { setUser, setLoading, clearUser } = userSlice.actions;
export default userSlice.reducer;
