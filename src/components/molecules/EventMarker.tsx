import React, { FC } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { makeStyles, Theme } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import MarkerPopUp from '../atoms/MarkerPopUp';
// import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks/redux';
import { selectCategories } from '../../state/slices/categorySlice';
import Icon from '../../interfaces/iconInterfaces';
import MarkerIcon from '../atoms/icons/MapIcons';

const useStyles = makeStyles((theme: Theme) => ({
	marker: {
		marginTop: `-${theme.spacing(8)}px !important`,
		marginLeft: `-${theme.spacing(4)}px !important`,
	},
	place: {
		position: 'relative',
		'&>*:first-child': {
			filter: 'drop-shadow(3px 3px 4px rgb(0 0 0 / 0.4))',
			fontSize: theme.spacing(8),
		},
		'&>*:last-child': {
			top: theme.spacing(1),
			left: theme.spacing(2),
			fontSize: theme.spacing(4),
		},
		'&>*': {
			position: 'absolute',
		},
	},
}));

interface EventMarkerProps {
	events: any[];
}

const EventMarker: FC<EventMarkerProps> = ({ events }) => {
	const classes = useStyles();

	const { categories } = useAppSelector(selectCategories);

	const vacio = <div />;
	if (events == null) {
		return vacio;
	}

	const eventos = events.map((evento: any) => {
		if (
			evento.location.latitude == null ||
			evento.location.longitude == null ||
			!evento.isActive
		) {
			return vacio;
		}
		// const iconAddress = findIcon(evento.category);
		/* const typeIcons = icon({
			iconUrl: iconAddress,
			iconSize: [38, 95],
		}); */

		const categoryName = categories.find(
			(category) => category.id === evento.category,
		);
		const Icono = (Icons as any)[categoryName?.icon.name || 'Menu'];
		const typeIcon = divIcon({
			html: ReactDOMServer.renderToString(
				categoryName?.icon.type === Icon.Types.MATERIAL_UI ? (
					<div className={classes.place}>
						<MarkerIcon
							color="inherit"
							style={{ color: categoryName?.color || 'red' }}
							fontSize="inherit"
						/>
						<Icono fontSize="inherit" style={{ color: 'white' }} />
					</div>
				) : (
					<div />
				),
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

	return <div>{eventos}</div>;
};

export default EventMarker;
