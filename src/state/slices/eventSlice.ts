import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Redux as CommonRedux } from '../../interfaces/common';
import { Event } from '../../interfaces/eventInterfaces';
import type { RootState } from '../store';
import { getEvents } from '../../api/backtura/eventApi';

const initialState: CommonRedux.GenericInitialState<{
	coords: {
		lat: string;
		lon: string;
	};
	events: Event[];
	createEvent?: boolean;
}> = {
	status: 'loading',
	value: {
		coords: {
			lat: '0',
			lon: '0',
		},
		events: [],
	},
};

export const fetchEvents = createAsyncThunk('event/fetchEvents', async () => {
	const res = await getEvents();
	return res.data;
});

export const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		setEvents: (state, action: PayloadAction<Event[]>) => {
			state.value.events = action.payload;
		},
		setCreateEvent: (state, action: PayloadAction<boolean>) => {
			state.value.createEvent = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEvents.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchEvents.fulfilled, (state, action) => {
				state.status = 'idle';
				state.value.events = action.payload;
			});
	},
});

export const { setEvents, setCreateEvent } = eventSlice.actions;
export const selectEvents = (state: RootState) => ({
	events: state.event.value.events,
	status: state.event.status,
	createEvent: state.event.value.createEvent,
});

export default eventSlice.reducer;
