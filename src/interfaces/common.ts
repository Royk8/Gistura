export namespace Redux {
	export interface GenericInitialState<ValueType> {
		value: ValueType;
		status: 'idle' | 'loading' | 'failed';
	}
}
