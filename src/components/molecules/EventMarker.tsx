import React, { FC } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { makeStyles, Theme } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import * as CustomIcons from '../atoms/icons/MapIcons';
import MarkerPopUp from '../atoms/MarkerPopUp';
// import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks/redux';
import { selectCategories } from '../../state/slices/categorySlice';
import Icon from '../../interfaces/iconInterfaces';
import MarkerIcon from '../atoms/icons/MapIcons';

const useStyles = makeStyles((theme: Theme) => ({
	marker: {
		marginTop: `-${theme.spacing(6)}px !important`,
		marginLeft: `-${theme.spacing(3)}px !important`,
	},
	place: {
		position: 'relative',
		'&>*:first-child': {
			filter: 'drop-shadow(3px 3px 4px rgb(0 0 0 / 0.4))',
			fontSize: theme.spacing(6),
		},
		'&>*:last-child': {
			top: theme.spacing(1),
			left: theme.spacing(1.725),
			fontSize: theme.spacing(2.5),
		},
		'&>*': {
			position: 'absolute',
		},
	},
}));

interface EventMarkerProps {
	eventos: any[];
}

const EventMarker: FC<EventMarkerProps> = ({ eventos }) => {
	const classes = useStyles();
	const { categories } = useAppSelector(selectCategories);

	const vacio = <div />;
	if (eventos == null) {
		return vacio;
	}

	const events = eventos.map((evento: any) => {
		if (
			evento.location.latitude == null ||
			evento.location.longitude == null ||
			!evento.isActive
		) {
			return vacio;
		}
		const categoryName = categories.find(
			(category) => category.id === evento.category,
		);
		const Icono = (Icons as any)[categoryName?.icon.name || 'Menu'];
		const CustomIcono = (CustomIcons as any)[
			categoryName?.icon.name || 'CelebrationRounded'
		];

		const typeIcon = divIcon({
			html: ReactDOMServer.renderToString(
				<div className={classes.place}>
					<MarkerIcon
						color="inherit"
						style={{ color: categoryName?.color || 'red' }}
						fontSize="inherit"
					/>
					{categoryName?.icon.type === Icon.Types.MATERIAL_UI ? (
						<Icono fontSize="inherit" style={{ color: 'white' }} />
					) : (
						<CustomIcono
							fontSize="inherit"
							style={{ color: 'white' }}
						/>
					)}
				</div>,
			),
			className: classes.marker,
		});

		const coordinate = {
			lat: evento.location.latitude,
			lng: evento.location.longitude,
		};

		return (
			<Marker position={coordinate} icon={typeIcon} title={evento.name}>
				<Popup maxWidth={500}>
					<MarkerPopUp event={evento} />
				</Popup>
			</Marker>
		);
	});

	return <div>{events}</div>;
};

export default EventMarker;
