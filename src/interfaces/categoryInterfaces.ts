import Icon from './iconInterfaces';

export namespace Category {
	export interface Base<DateType = Date> {
		id: number;
		name: string;
		color: string;
		icon: Icon.Api.Response;
		description?: string;
		event: number;
		createdAt: DateType;
		updatedAt: DateType;
	}

	export namespace Api {
		export type Response = Base<string>;
	}
}

export default Category;
