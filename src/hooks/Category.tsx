import * as Icons from '@material-ui/icons';
import { SvgIcon } from '@material-ui/core';

import * as CustomIcons from '../components/atoms/icons/MapIcons';
import { useAppSelector } from './redux';
import { selectCategories } from '../state/slices/categorySlice';
import { Icon as IconInterface } from '../interfaces/iconInterfaces';

const useCategory = (id: number) => {
	const { categories } = useAppSelector(selectCategories);

	const category = categories.find(({ id: findId }) => findId === id);

	if (!category) return null;

	const { name, type } = category.icon;

	const IconComponent: typeof SvgIcon =
		type === IconInterface.Types.CUSTOM
			? (CustomIcons as any)[name]
			: (Icons as any)[name];

	return {
		IconComponent,
		category,
	};
};

export default useCategory;
