import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import categoryReducer from './slices/categorySlice';

const store = configureStore({
	reducer: {
		category: categoryReducer,
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
