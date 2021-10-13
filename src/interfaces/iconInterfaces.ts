export namespace Icon {
	export enum Types {
		MATERIAL_UI = 'ICON_TYPES/MATERIAL_UI',
		CUSTOM = 'ICON_TYPES/CUSTOM',
	}

	export interface Base {
		id: number;
		name: string;
		type: Types;
	}

	export namespace Api {
		export type Response = Base;
	}
}

export default Icon;
