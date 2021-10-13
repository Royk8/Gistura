import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Circle, MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Map, divIcon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Badge, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { MoreHoriz } from '@material-ui/icons';
import EventMarker from './EventMarker';
import 'leaflet/dist/leaflet.css';
import customTheme from '../../styles/theme';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
	selectEvents,
	fetchEvents,
	setCreateEvent,
	setEvents,
} from '../../state/slices/eventSlice';
import MarkerIcon from '../atoms/icons/MapIcons';
import { initialEvent } from '../../interfaces/eventInterfaces';

const useStyles = makeStyles((theme: Theme) => ({
	map: {
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			height: 'calc(100vh - 56px)',
		},
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100vh - 64px)',
		},
	},
	marker: {
		marginTop: `-${theme.spacing(6)}px !important`,
		marginLeft: `-${theme.spacing(3)}px !important`,
	},
	place: {
		position: 'relative',
		'&>*:first-child': {
			color: theme.palette.primary.main,
			filter: 'drop-shadow(3px 3px 4px rgb(0 0 0 / 0.4))',
			fontSize: theme.spacing(6),
		},
		'&>*:last-child': {
			top: theme.spacing(0.6),
			left: theme.spacing(1.5),
			fontSize: theme.spacing(3),
		},
		'&>*': {
			position: 'absolute',
		},
	},
	badge: {
		top: 3,
		left: 20,
		zIndex: 201,
		filter: 'drop-shadow(3px 3px 4px rgb(0 0 0 / 0.4))',
	},
}));

const MapViewer = () => {
	const [map, setMap] = useState<Map | null>(null);
	const [currentLocation, setCurrentLocation] = useState<[number, number]>([
		0, 0,
	]);

	const { events, status } = useAppSelector(selectEvents);
	const dispatch = useAppDispatch();

	const EventosFuncionales = () => <EventMarker eventos={events} />;

	const classes = useStyles();

	const createClusterCustomIcon = (cluster: any) =>
		divIcon({
			html: ReactDOMServer.renderToString(
				<Badge
					badgeContent={cluster.getChildCount()}
					color="error"
					classes={{ anchorOriginTopRightRectangle: classes.badge }}
				>
					<div className={classes.place}>
						<MarkerIcon fontSize="inherit" />
						<MoreHoriz
							fontSize="inherit"
							style={{ color: 'white' }}
						/>
					</div>
				</Badge>,
			),
			className: classes.marker,
		});

	map?.removeEventListener('click');
	if (status !== 'loading' && !events.length) {
		map?.addEventListener('click', ({ latlng }: any) => {
			dispatch(
				setEvents([
					{
						...initialEvent,
						location: {
							...initialEvent.location,
							latitude: Number(latlng.lat),
							longitude: Number(latlng.lng),
						},
					},
				]),
			);
			dispatch(setCreateEvent(true));
		});
	}

	useEffect(() => {
		if (navigator?.geolocation && map) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const coords: [number, number] = [
						position.coords.latitude,
						position.coords.longitude,
					];

					map.setView(coords, 16);
					setCurrentLocation(coords);
				},
				console.error,
				{ enableHighAccuracy: true },
			);
		}
	}, [map]);

	useEffect(() => {
		dispatch(fetchEvents());
	}, []);

	return (
		<MapContainer
			center={[6.2519059, -75.5680812]}
			whenCreated={setMap}
			className={classes.map}
			zoom={14}
			scrollWheelZoom
			zoomControl={false}
		>
			<ZoomControl position="bottomright" />
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
			/>
			<MarkerClusterGroup
				showCoverageOnHover={false}
				iconCreateFunction={createClusterCustomIcon}
			>
				{EventosFuncionales()}
			</MarkerClusterGroup>
			{currentLocation[0] && currentLocation[1] && (
				<Circle
					center={currentLocation}
					radius={200}
					pathOptions={{
						color: customTheme.palette.primary.main,
					}}
					eventHandlers={{
						click: () => map?.setView(currentLocation, 16),
					}}
				/>
			)}
		</MapContainer>
	);
};

export default MapViewer;
