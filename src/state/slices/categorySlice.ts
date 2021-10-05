import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories } from '../../api/backtura/categoryApi';
import Category from '../../interfaces/categoryInterfaces';
import { Redux as CommonRedux } from '../../interfaces/common';
import type { RootState } from '../store';

const initialState: CommonRedux.GenericInitialState<Category.Base[]> = {
	status: 'loading',
	value: [],
};

export const fetchCategories = createAsyncThunk(
	'category/fetchCategories',
	async () => {
		const res = await getCategories();
		return res.data.map(({ createdAt, updatedAt, ...category }) => ({
			...category,
			createdAt: new Date(createdAt),
			updatedAt: new Date(updatedAt),
		}));
	},
);

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<Category.Base[]>) => {
			state.value = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.status = 'idle';
				state.value = action.payload;
			});
	},
});

export const { setCategory } = categorySlice.actions;
export const selectCategories = (state: RootState) => ({
	categories: state.category.value,
	loading: state.category.status === 'loading',
});

export default categorySlice.reducer;
