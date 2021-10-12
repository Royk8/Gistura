import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import categoryReducer from './slices/categorySlice';
import eventReducer from './slices/eventSlice';

const store = configureStore({
	reducer: {
		category: categoryReducer,
		event: eventReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export default store;
