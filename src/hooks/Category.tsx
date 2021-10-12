import React, { FC } from 'react';
import * as Icons from '@material-ui/icons';
import { SvgIcon, Theme, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import * as CustomIcons from '../components/atoms/icons/MapIcons';
import { useAppSelector } from './redux';
import { selectCategories } from '../state/slices/categorySlice';
import { Icon as IconInterface } from '../interfaces/iconInterfaces';

interface Props {
	id: number;
	label?: boolean;
	noColor?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		'&>*:not(:last-child)': {
			marginRight: theme.spacing(1),
		},
	},
}));

const useCategory = ({ id, label, noColor }: Props) => {
	const { categories } = useAppSelector(selectCategories);

	const category = categories.find(({ id: findId }) => findId === id);
	const classes = useStyles();

	if (!category) return null;

	const { name, type } = category.icon;

	const Icon: typeof SvgIcon =
		type === IconInterface.Types.CUSTOM
			? (CustomIcons as any)[name]
			: (Icons as any)[name];

	const Container: FC = ({ children }) =>
		label ? (
			<div className={classes.container}>{children}</div>
		) : (
			<>{children}</>
		);

	const style = noColor ? undefined : { color: category.color };

	const Component : FC = () => (
		<Container>
			<Icon color="inherit" style={style} />
			{label && (
				<Typography color="inherit" style={style}>
					{category.name}
				</Typography>
			)}
		</Container>
	);

	return {
		Component,
		category,
	};
};

export default useCategory;
