import { createSlice } from '@reduxjs/toolkit';
import { Redux as CommonRedux } from '../../interfaces/common';
import type { RootState } from '../store';

const initialState: CommonRedux.GenericInitialState<{
	logged: boolean;
}> = {
	status: 'loading',
	value: {
		logged: false,
	},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		toggleLogin: (state) => {
			state.value.logged = !state.value.logged;
		},
	},
});

export const { toggleLogin } = authSlice.actions;
export const isLogged = (state: RootState) => ({
	logged: state.auth.value.logged,
});

export default authSlice.reducer;
