import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Redux as CommonRedux } from '../../interfaces/common';
import type { RootState } from '../store';

const initialState: CommonRedux.GenericInitialState<{
	lat: string;
	lon: string;
}> = {
	status: 'loading',
	value: {
		lat: '0',
		lon: '0',
	},
};

export const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		setLocation: (
			state,
			action: PayloadAction<{ lat: string; lon: string }>,
		) => {
			state.value = action.payload;
		},
	},
});

export const { setLocation } = eventSlice.actions;
export const selectEvents = (state: RootState) => ({
	location: state.event.value,
});

export default eventSlice.reducer;
